import { useEffect, useState } from 'react'
import { createNewAccount } from '../nostr'
import { Account } from '../store'
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
      const newAccount = createNewAccount()
      console.log(newAccount)
    }
  }, [keys])

  return loading ? null : account
}
