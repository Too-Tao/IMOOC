import fetch from 'dva/fetch'
import pathToRegexp from 'path-to-regexp'
import { typeOf, isEmptyObject } from '@/utils/common'
import { stringify } from 'qs'
import Cookies from 'cookiejs'
import router from 'umi/router'
import { notification } from 'antd'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求地址不存在。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}



function checkStatus(response) {
  const { status } = response
  if (status >= 200 && status < 300) {
    return response
  }
  const errorText = codeMessage[status]
  if (status === 401) {
    router.push('/')
  } else {
    notification.error({
      message: `请求错误${status}`,
      description: errorText
    })
    router.replace('/login')
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

  const newOptions = {
    'credentials': 'include', // Fetch 请求默认是不带 cookie 的，设置此项即可
    headers: {
      'X-CSRFToken': Cookies.get('_csrf_token'), // token
    },
    method,
    ...options
  }

  //对URL进行处理

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(newOptions.body)
    for (const item of match) {
      if (typeOf(item) === 'object' && item.name) {
        delete newOptions.body[item.name]
      }
    }
    if (!(newOptions.body instanceof FormData) && !(newOptions.body instanceof URLSearchParams)) {
      newOptions.headers = {
        Accept: 'application/json',
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        ...newOptions.headers
      }
    }
  } else if (newOptions.method === 'GET') {
    const { params = {} } = newOptions
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

  return fetch(url, newOptions)
            .then(checkStatus)
            .then(response => {
              if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text()
              }
              return response.json()
            })
}

export default request