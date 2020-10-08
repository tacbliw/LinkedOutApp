import { AxiosResponse } from 'axios'
import { deserialize } from '../../helpers/serialization'

export function responseInterceptor(response: AxiosResponse) {
  if (typeof response.data === 'object' && response.data !== null) {
    response.data = deserialize(response.data)
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('<!-- Begin Response -->')
    console.log(response.data)
    console.log('<!-- End Response -->')
  }
  return response
}
