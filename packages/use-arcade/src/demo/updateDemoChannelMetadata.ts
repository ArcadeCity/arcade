import {
  createNewAccount,
  getEventHash,
  NostrEvent,
  NostrEventToSerialize,
  NostrEventToSign,
  NostrKind,
  signEvent,
} from '../nostr'
import { ChannelMetadata } from '../store'

export const updateDemoChannelMetadata = async (channelId: string) => {
  const { pubkey, privkey } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const twohundy = Math.round(200 + Math.random() * 5)
  const photo = `https://placekitten.com/200/${twohundy.toString()}`
  const channelMetadata = {
    about: `test about metadadtatatata ${twohundy}`,
    channelId,
    name: `test name ${twohundy}`,
    picture: photo,
    type: 'public', // maybe 'public', 'private', 'geohash', 'geocoords'
  }
  const nostrEventToSerialize: NostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: NostrKind.channelmetadata,
    tags: [['#e', channelId]],
    content: JSON.stringify(channelMetadata),
    pubkey,
  }
  const id = getEventHash(nostrEventToSerialize)
  const nostrEventToSign: NostrEventToSign = {
    ...nostrEventToSerialize,
    id,
  }
  const sig = await signEvent(nostrEventToSign, privkey)
  const nostrEvent: NostrEvent = {
    ...nostrEventToSerialize,
    id,
    sig,
  } as ChannelMetadata
  return nostrEvent
}
