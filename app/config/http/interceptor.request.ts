import { AxiosRequestConfig } from 'axios'
import { getAuthorization } from './authorization'

export function requestInterceptor(config: AxiosRequestConfig) {
  config.headers = getAuthorization(config.headers)
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
  }
  // config.data = serialize(config.data)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('<!-- Begin Request -->')
    // eslint-disable-next-line no-console
    console.log(config.data)
    // eslint-disable-next-line no-console
    console.log('<!-- End Request -->')
  }
  return config
}
