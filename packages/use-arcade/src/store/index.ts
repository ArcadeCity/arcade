import { proxy, useSnapshot } from 'valtio'
import { proxyMap } from 'valtio/utils'
import { NostrEvent, NostrKind } from '../nostr'

interface Store {
  events: Map<string, NostrEvent>
}

export const store = proxy<Store>({
  events: proxyMap(),
})

export const addEvent = (event: NostrEvent) => {
  store.events.set(event.id, event)
  console.log(`Stored event ${event.id}`)
}

export const useRideRequests = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray.filter((event: NostrEvent) => event.kind === NostrKind.riderequest)
}
