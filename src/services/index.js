import request from '@/utils/request'
import api from './api'

const gen = (params) => {
  let url = params
  let method = 'GET'
  let errorType = 'error'
  const paramsArray = params.split(' ')
  if (paramsArray.length >= 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }
  if (paramsArray.length === 3) {
    errorType = paramsArray[2]
  }

  return async (opt) => {
    const options = method === 'GET'
      ? { params: { ...opt } }
      : { body: opt }
    return request(`/api${url}`, options, method, errorType)
  }
}

const APIFunction = {}
for (const key in api) {
  if (api.hasOwnProperty(key)) {
    APIFunction[key] = gen(api[key])
  }
}

export default APIFunction
