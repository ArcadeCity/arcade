import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { Channel, store } from '../store'

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
