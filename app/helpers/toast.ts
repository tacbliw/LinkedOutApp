import { Toast } from 'native-base'

export function showError(message: string) {
  Toast.show({
    type: 'danger',
    buttonText: 'OK',
    text: message,
  })
}

export function showInfo(message: string) {
  Toast.show({
    type: 'success',
    buttonText: 'OK',
    text: message,
  })
}
