import { API_BASE_URL } from "../config/consts"

export function extensionFromUrl(s: string): string {
  const e = s.split('.')
  return e[e.length - 1]
}

export function toBackendUrl(path: string): string {
  if (path.startsWith('http') || path.startsWith('file')) { // dealing with full URL
    return path
  }
  if (path.startsWith('.')) {
    return path
  }
  return API_BASE_URL + path.replace(/^\/+/, '')
}
