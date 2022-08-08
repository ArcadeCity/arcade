import { useSnapshot } from 'valtio'
import { NostrEvent, NostrKind } from '../nostr'
import { store } from '../store'
import { useAccountKeys } from './useAccountKeys'

export const useAccountMetadata = () => {
  const snapshot = useSnapshot(store)
  const keys = useAccountKeys()
  if (!keys) {
    return null
  }
  const publicKey = keys.publicKey
  const eventArray = Array.from(snapshot.events.values()) as NostrEvent[]
  const metadataEvents = eventArray
    .filter((event: NostrEvent) => event.kind === NostrKind.metadata)
    .filter((event: NostrEvent) => event.pubkey === publicKey)
    .sort((a: NostrEvent, b: NostrEvent) => b.created_at - a.created_at)

  const metadata =
    metadataEvents.length > 0
      ? JSON.parse(metadataEvents[0].content)
      : {
          name: 'ArcadeAnon',
          about: 'New user',
          picture: 'https://placekitten.com/200/200',
        }

  return metadata
}
