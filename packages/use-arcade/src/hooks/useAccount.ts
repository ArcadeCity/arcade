import { useEffect, useState } from 'react'
import { createNewAccount, getKeysForMnemonic, getKeysForNsec } from '../nostr'
import { Account, AccountKeys, store } from '../store'
import { useAccountKeys } from './useAccountKeys'
import { useAccountMetadata } from './useAccountMetadata'
import * as SecureStore from 'expo-secure-store'

export const useAccount = () => {
  const [loading, setLoading] = useState(true)
  const keys = useAccountKeys()
  const metadata = useAccountMetadata()
  const account = {
    keys,
    metadata,
  } as Account

  const checkForKeys = async () => {
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      const publicKey = await SecureStore.getItemAsync('ARCADE_NPUB')
      const privateKey = await SecureStore.getItemAsync('ARCADE_NSEC')
      const mnemonic = await SecureStore.getItemAsync('ARCADE_MNEMONIC')

      if (publicKey && privateKey && mnemonic) {
        const keys: AccountKeys = { publicKey, privateKey, mnemonic }
        store.accountKeys = keys
        console.log('Set account keys!')
        return
      }
    }

    // console.log('Creating new keys.')
    // const newAccountKeys = createNewAccount()
    // store.accountKeys = newAccountKeys
    // store.accountMetadata = {
    //   name: 'ArcadeAnon',
    //   about: 'New user',
    //   picture: 'https://placekitten.com/200/200',
    // }
    // if (storeAvailable) {
    //   await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
    //   await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
    //   await SecureStore.setItemAsync('ARCADE_MNEMONIC', newAccountKeys.mnemonic)
    // }
    setLoading(false)
  }

  useEffect(() => {
    if (!keys || !keys.privateKey || !keys.publicKey) {
      // So the store has no keys. Maybe we tried rehydrating (unimpl.)
      // Now check if we have keys in device storage.
      checkForKeys()
    } else if (keys) {
      // console.log('We got keys! Pub:', keys.publicKey)
      setLoading(false)
      return
    }
  }, [keys])

  const accountActions = {
    login: async ({ mnemonic, nsec }) => {
      if (mnemonic) {
        console.log('LOGGING IN WITH MNEMONIC', mnemonic)
        const { privateKey, publicKey } = getKeysForMnemonic(mnemonic)
        const newAccountKeys: AccountKeys = { mnemonic, privateKey, publicKey }
        store.accountKeys = newAccountKeys
        console.log('store.accountKeys set.')
        const storeAvailable = await SecureStore.isAvailableAsync()
        if (storeAvailable) {
          await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
          await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
          await SecureStore.setItemAsync('ARCADE_MNEMONIC', newAccountKeys.mnemonic)
        }
      }
      if (nsec) {
        console.log('LOGGING IN WITH NSEC', nsec)
        const { privateKey, publicKey } = getKeysForNsec(nsec)
        const newAccountKeys: AccountKeys = { mnemonic, privateKey, publicKey }
        console.log('newAccountKeys', newAccountKeys)
        store.accountKeys = newAccountKeys
        const storeAvailable = await SecureStore.isAvailableAsync()
        if (storeAvailable) {
          await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
          await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
          await SecureStore.setItemAsync('ARCADE_MNEMONIC', newAccountKeys.mnemonic)
        }
      }
    },
    logout: async () => {
      store.accountKeys = null
      store.accountMetadata = null
      const storeAvailable = await SecureStore.isAvailableAsync()
      if (storeAvailable) {
        await SecureStore.deleteItemAsync('ARCADE_NPUB')
        await SecureStore.deleteItemAsync('ARCADE_NSEC')
        await SecureStore.deleteItemAsync('ARCADE_MNEMONIC')
      }
    },
  }

  return loading ? [null, null] : [account, accountActions]
}
