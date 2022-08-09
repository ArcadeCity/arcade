import { useCallback, useState } from 'react'
import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { Channel, store } from '../store'
import useInterval from './useInterval'

export const useChannelsCreated: () => Channel[] = () => {
  const snapshot = useSnapshot(store)
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]

  // const [, updateState] = useState({})
  // const forceUpdate = useCallback(() => {
  //   console.log('force update?')
  //   updateState({})
  // }, [])
  // useInterval(forceUpdate, 1000)

  return eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.channelcreate)
    .map((event: NostrEvent) => {
      const parsedEvent = JSON.parse(event.content)
      const cleanedEvent = Object.assign({}, event)
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
    .sort(
      (a: Channel, b: Channel) =>
        snapshot.lastMessages.get(b.id)?.created_at - snapshot.lastMessages.get(a.id)?.created_at,
    )
}
