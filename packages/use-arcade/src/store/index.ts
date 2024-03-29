import { proxy, useSnapshot } from 'valtio'
import { proxyMap } from 'valtio/utils'
import { NostrEvent, NostrKind } from '../nostr'

interface Store {
  accountKeys: AccountKeys | null
  accountMetadata: AccountMetadata | null
  activeChannelId: string | null
  events: Map<string, NostrEvent>
  lastMessages: Map<string, Message>
}

export const store = proxy<Store>({
  accountKeys: null,
  accountMetadata: null,
  activeChannelId: null,
  lastMessages: proxyMap(),
  events: proxyMap(),
})

export const setActiveChannelId = (channelId: string | null) => {
  store.activeChannelId = channelId
}

export const addEvent = (event: NostrEvent) => {
  try {
    store.events.set(event.id, event)
    console.log(`Stored event kind ${event.kind} - id ${event.id}`)
  } catch (e: any) {
    console.log(e.message)
  }
}

export const useRideRequests = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray.filter((event: NostrEvent) => event.kind === NostrKind.riderequest)
}

export interface Account {
  keys: AccountKeys
  metadata: AccountMetadata
}

export interface AccountKeys {
  mnemonic: string
  publicKey: string
  privateKey: string
}

export interface AccountMetadata {
  name: string
  about: string
  picture: string
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
  text: string
  type: string // text, image, etc...
}
