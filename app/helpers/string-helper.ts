import { API_BASE_URL } from "../config/consts"

export function extensionFromUrl(s: string): string {
  const e = s.split('.')
  return e[e.length - 1]
}

export function toBackendUrl(path: string): string {
  if (path.startsWith('http')) {
    return path
  }
  return API_BASE_URL + path.replace(/$\/+/, '')
}
