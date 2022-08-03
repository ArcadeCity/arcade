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
  return eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelcreate)
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event)
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as Channel
    })
}

export const useRideRequests = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray.filter((event: NostrEvent) => event.kind === NostrKind.riderequest)
}

export interface Channel extends NostrEvent {
  about: string
  name: string
  picture: string
  type: string // maybe 'public', 'private', 'geohash', 'geocoords'
}

export interface ChannelMetadata extends Channel {
  channelId: string // TODO: Change this to a tag referencing channel_create_event
}

export interface Message extends NostrEvent {
  channelId: string // TODO: Change this to a tag referencing channel_create_event
  content: string
  type: string // text, image, etc...
}
