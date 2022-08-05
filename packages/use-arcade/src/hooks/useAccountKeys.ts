import { useSnapshot } from 'valtio'
import { store } from '../store'

export const useAccountKeys = () => {
  const snapshot = useSnapshot(store)
  return snapshot.accountKeys
}
