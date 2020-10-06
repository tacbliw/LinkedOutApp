import React from 'reactn'
import { GlobalState } from '../global'

export function getAuthorization(headers: Record<string, string>): Record<string, string> {
  const { accessToken } = React.getGlobal<GlobalState>()
  if (typeof accessToken === 'string' && accessToken !== '') {
    return {
      ...headers,
      Authorizarion: `Bearer ${accessToken}`
    }
  }
  return headers
}
