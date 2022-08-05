import { useState } from 'react'
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

  return loading ? null : account
}
