import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { Message, store } from '../store'
import { isArrayInArray } from '../utilts'

export const useChannelMessages: (channelId: string) => Message[] = (channelId: string) => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelmessage)
    .filter((event: NostrEvent) => isArrayInArray(['#e', channelId], event.tags))
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event)
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as Message
    })
}
