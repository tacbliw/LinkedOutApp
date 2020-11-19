import { AxiosError } from 'axios'
import { showError } from '../../helpers/toast'

export async function errorInterceptor(error: AxiosError) {
  if (error?.response?.status) {
    switch (error.response.status) {
      case 400:
        showError('errors.400')
        break

      case 401:
        // await removeCredentials()
        showError('errors.401')
        break

      case 403:
        showError('errors.403')
        break

      case 409:
        showError('errors.409')
        break

      case 420:
        if (__DEV__) {
          if (error?.response?.data?.Message) {
            showError('errors.backend: ' + error.response.data)
          } else {
            showError('errors.420')
          }
        }
        break

      case 500:
        showError('errors.500')
        break

      case 502:
        showError('errors.502')
        break
    }
  }
  throw error
}
