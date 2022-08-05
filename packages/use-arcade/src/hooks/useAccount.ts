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
    if (keys) {
      // console.log('We got keys!', keys)
      return
    }
    if (!keys || !keys.privateKey || !keys.publicKey || !keys.mnemonic) {
      const newAccountKeys = createNewAccount()
      store.accountKeys = newAccountKeys
      store.accountMetadata = {
        name: 'ArcadeAnon',
        about: 'New user',
        picture: 'https://placekitten.com/200/200',
      }
      setLoading(false)
    }
  }, [keys])

  return loading ? null : account
}
