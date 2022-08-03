import { useSnapshot } from 'valtio'
import { NostrEvent } from '../nostr'
import { ChannelMetadata, store } from '../store'

export const useChannelMetadata: (channelId: string) => ChannelMetadata = (channelId: string) => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  const channelMetadataEvents = eventArray
    .filter((event: NostrEvent) => isArrayInArray(['#e', channelId], event.tags))
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event)
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as ChannelMetadata
    })
    .sort((a, b) => a.created_at - b.created_at)
  return channelMetadataEvents[0]
}

function isArrayInArray(arr: string[], item: any[]) {
  var item_as_string = JSON.stringify(item)

  var contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string
  })
  return contains
}
