import { AxiosResponse } from 'axios'

export function responseInterceptor(response: AxiosResponse) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('<!-- Begin Response -->')
    // eslint-disable-next-line no-console
    console.log(response.data)
    // eslint-disable-next-line no-console
    console.log('<!-- End Response -->')
  }
  // if (typeof response.data === 'object' && response.data !== null) {
  //   response.data = deserialize(response.data)
  // }
  return response
}
