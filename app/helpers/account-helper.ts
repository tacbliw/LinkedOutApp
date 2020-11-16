import AsyncStorage from "@react-native-community/async-storage"
import React from 'reactn'
import { GlobalState } from "../config/global"

export async function removeCredentials() {
  const newGlobalState: Partial<GlobalState> = {
    accessToken: null
  }

  await Promise.all([
    React.setGlobal<GlobalState>(newGlobalState),
    AsyncStorage.removeItem('accessToken'),
    AsyncStorage.removeItem('accountId'),
    AsyncStorage.removeItem('accountType'),
    AsyncStorage.removeItem('accountName'),
  ])
}

export async function saveCredentials(
    accessToken: string,
    accountId: string,
    accountType: string,
    accountName: string
  ) {
  await Promise.all([
    AsyncStorage.setItem('accessToken', accessToken),
    AsyncStorage.setItem('accountId', accountId),
    AsyncStorage.setItem('accountType', accountType),
    AsyncStorage.setItem('accountName', accountName),
    React.setGlobal<GlobalState>({
      accessToken: accessToken
    })
  ])
}
