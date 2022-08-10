import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { Channel, store } from '../store'

export const useChannelsCreated: () => Channel[] = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]

  return eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelcreate)

    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content) as any
      const cleanedEvent = Object.assign({}, event) as any
      if (parsedEvent.image) {
        parsedEvent.picture = parsedEvent.image
      }
      delete parsedEvent.image
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as Channel
    })
    .filter((channel: Channel) => !!channel.about)
    .sort((a: Channel, b: Channel) => b.created_at - a.created_at)
  // .sort(
  //   (a: Channel, b: Channel) =>
  //     snapshot.lastMessages.get(b.id)?.created_at - snapshot.lastMessages.get(a.id)?.created_at,
  // )
}
