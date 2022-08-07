import { useEffect, useState } from 'react'
import { createNewAccount } from '../nostr'
import { Account, store } from '../store'
import { useAccountKeys } from './useAccountKeys'
import { useAccountMetadata } from './useAccountMetadata'

export const useAccount: () => Account | null = () => {
  const [loading, setLoading] = useState(true)
  const keys = useAccountKeys()
  const metadata = useAccountMetadata()
  const account: Account = {
    keys,
    metadata,
  }

  useEffect(() => {
    if (!keys || !keys.privateKey || !keys.publicKey || !keys.mnemonic) {
      console.log('Creating new keys.')
      const newAccountKeys = createNewAccount()
      store.accountKeys = newAccountKeys
      store.accountMetadata = {
        name: 'ArcadeAnon',
        about: 'New user',
        picture: 'https://placekitten.com/200/200',
      }
      setLoading(false)
    } else if (keys) {
      console.log('We got keys! Pub:', keys.publicKey)
      return
    }
  }, [keys])

  return loading ? null : account
}
