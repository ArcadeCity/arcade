import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { ChannelMetadata, store } from '../store'
import { isArrayInArray } from '../utilts'
import { useActiveChannelId } from './useActiveChannelId'
import { useChannel } from './useChannel'

export const useChannelMetadata: (channelIdProvided?: string | undefined) => ChannelMetadata = (
  channelIdProvided: string | undefined = undefined,
) => {
  const activeChannelId = useActiveChannelId()
  const channelId = channelIdProvided ?? activeChannelId
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  const channel = useChannel(channelId)
  const channelMetadataEvents = eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelmetadata)
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
  // If there's a channel metadata event for the channel, return it.
  if (channelMetadataEvents.length > 0) {
    console.log('channelMetadataEvent! returning', channelMetadataEvents[0])
    return channelMetadataEvents[0]
  } else {
    // Otherwise use data from the channel creation event
    return {
      ...channel,
      channelId: channelId,
    } as ChannelMetadata
  }
}
