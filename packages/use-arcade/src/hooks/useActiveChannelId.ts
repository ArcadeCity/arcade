import { useSnapshot } from 'valtio'
import { store } from '../store'

export const useActiveChannelId: () => string | null = () => {
  const snapshot = useSnapshot(store)
  return snapshot.activeChannelId
}
