import { useSnapshot } from 'valtio'
import { store } from '../store'

export const useAccountMetadata = () => {
  const snapshot = useSnapshot(store)
  return snapshot.accountMetadata
}
