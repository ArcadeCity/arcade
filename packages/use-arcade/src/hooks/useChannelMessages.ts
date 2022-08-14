import { useContext } from 'react'
import { useSnapshot } from 'valtio'
import { ArcadeContext } from '../context'
import { NostrEvent, NostrKind } from '../nostr'
import { Message, store } from '../store'
import { isArrayInArray } from '../utilts'
import { useDebounce } from './useDebounce'

export const useChannelMessages: (channelId: string) => Message[] = (channelId: string) => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  const context = useContext(ArcadeContext)
  const messages = eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelmessage)
    .filter((event: NostrEvent) => isArrayInArray(['#e', channelId], event.tags))
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event) as any
      delete cleanedEvent.content
      return {
        ...cleanedEvent,
        ...parsedEvent,
      } as Message
    })
  // if (messages.length === 0) {
  //   if (context && context.actions) {
  //     const actions = context.actions as any
  //     actions.checkChannelMessages(channelId)
  //   }
  // }
  // console.log('useChannelMessages returning messages #:', messages.length)
  return messages
}
