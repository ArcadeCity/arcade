import { proxy, useSnapshot } from 'valtio'
import { proxyMap } from 'valtio/utils'
import { NostrEvent, NostrKind } from '../nostr'

interface Store {
  activeChannelId: string | null
  events: Map<string, NostrEvent>
}

export const store = proxy<Store>({
  activeChannelId: null,
  events: proxyMap(),
})

export const setActiveChannelId = (channelId: string | null) => {
  store.activeChannelId = channelId
}

export const addEvent = (event: NostrEvent) => {
  try {
    store.events.set(event.id, event)
    console.log(`Stored event kind ${event.kind} - id ${event.id}`)
  } catch (e) {
    console.log(e.message)
  }
}

export const useActiveChannelId: () => string | null = () => {
  const snapshot = useSnapshot(store)
  return snapshot.activeChannelId
}

export const useChannelsCreated: () => Channel[] = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return (
    eventArray
      .filter((event: NostrEvent) => event.kind === NostrKind.channelcreate)
      // Loop over each event and JSON.parse the content
      .map((event: NostrEvent) => {
        const parsedEvent = JSON.parse(event.content)
        const cleanedEvent = Object.assign({}, event)
        delete cleanedEvent.content
        return {
          ...cleanedEvent,
          ...parsedEvent,
        } as Channel
      })
  )
}

export const useRideRequests = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray.filter((event: NostrEvent) => event.kind === NostrKind.riderequest)
}

export interface Channel extends NostrEvent {
  image: string
  name: string
  type: string
}
