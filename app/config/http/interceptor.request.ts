import { AxiosRequestConfig } from 'axios'
import { serialize } from '../../helpers/serialization'
import { getAuthorization } from './authorization'

export function requestInterceptor(config: AxiosRequestConfig) {
  config.headers = getAuthorization(config.headers)
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
  }
  config.data = serialize(config.data)
  if (process.env.NODE_ENV === 'development') {
    console.log('<!-- Begin Request -->')
    console.log(config.data)
    console.log('<!-- End Request -->')
  }
  return config
}
