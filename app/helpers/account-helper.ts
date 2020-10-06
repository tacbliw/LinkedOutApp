import AsyncStorage from "@react-native-community/async-storage"
import React from 'reactn'
import { GlobalState } from "../config/global"

export async function removeCredentials() {
  const newGlobalState: Partial<GlobalState> = {
    accessToken: null
  }

  await Promise.all([
    React.setGlobal<GlobalState>(newGlobalState),
    AsyncStorage.removeItem('accessToken')
  ])
}

export async function saveCredentials(accessToken: string) {
  await Promise.all([
    AsyncStorage.setItem('accessToken', accessToken),
    React.setGlobal<GlobalState>({
      accessToken: accessToken
    })
  ])
}
