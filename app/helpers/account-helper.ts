import AsyncStorage from "@react-native-community/async-storage"
import React from 'reactn'
import { GlobalState } from "../config/global"

export async function removeCredentials() {
  const newGlobalState: Partial<GlobalState> = {
    accessToken: null,
    accountId: null,
    accountType: null,
    accountName: null,
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
      accessToken: accessToken,
      accountId: accountId,
      accountType: accountType,
      accountName: accountName,
    })
  ])
}

export function getAccountMetadata(): {
  accountId: number,
  accountType: string,
  accountName: string
} {
  let accountId = 0
  let accountType = ''
  let accountName = ''
  AsyncStorage.getItem('accountId').then((value) => {
    accountId = Number(value)
  }, (reason) => console.log("Cannot get accountId: " + reason))
  AsyncStorage.getItem('accountType').then((value) => {
    accountType = value
  }, (reason) => console.log("Cannot get accountType: " + reason))
  AsyncStorage.getItem('accountName').then((value) => {
    accountName = value
  }, (reason) => console.log("Cannot get accountName: " + reason))

  return {
    accountId: accountId,
    accountType: accountType,
    accountName: accountName
  }
}

export function isEmail(s: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(s).toLowerCase())
}
