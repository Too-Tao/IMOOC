import fetch from 'dva/fetch'
import pathToRegexp from 'path-to-regexp'
import { typeOf, isEmptyObject } from '@/utils/common'
import { stringify } from 'qs'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText);
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options = {}, method = 'GET', handleErrorType = 'error' ) {
  //对URL进行处理
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url(options.body))
    for (const item of match) {
      if (typeOf(item) === 'object' && item.name) {
        delete options.body[item.name]
      }
    }
  } else if (method === 'GET') {
    const { params = {} } = options
    const shallowData = {...params}
    const match = pathToRegexp.parse(url)
    const [host, ...query] = url.split('?')
    url = pathToRegexp.compile(host)(params) + (query.length !== 0 ? '?' + query.join('?') : '')
    for (const item of match) {
      if (typeOf(item) === 'object' && item.name) {
        delete shallowData[item.name]
      }
    }
    url = isEmptyObject(shallowData) ? url : `${url}?${stringify(shallowData)}`
  }

  const response = await fetch(url, options)

  checkStatus(response)

  const data = await response.json()

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }

  return ret
}

export default request