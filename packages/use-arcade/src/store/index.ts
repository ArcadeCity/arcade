import { NostrEvent, NostrKind } from 'types'
import { proxy, useSnapshot } from 'valtio'
import { proxyMap } from 'valtio/utils'

interface Store {
  events: Map<string, NostrEvent>
}

export const store = proxy<Store>({
  events: proxyMap(),
})

export const addEvent = (event: NostrEvent) => {
  store.events.set(event.id, event)
}

export const useRideRequests = () => {
  const snapshot = useSnapshot(store)
  return Array.from(snapshot.events.values()).filter((event) => event.kind === NostrKind.riderequest)
}
