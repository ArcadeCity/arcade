import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { Message, store } from '../store'

export const useChannelMessages: (channelId: string) => Message[] = (channelId: string) => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  return eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelmessage)
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event)
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as Message
    })
    .filter((message: Message) => message.channelId === channelId)
}
