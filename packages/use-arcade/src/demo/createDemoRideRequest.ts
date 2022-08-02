import {
  createNewAccount,
  getEventHash,
  NostrEvent,
  NostrEventToSerialize,
  NostrEventToSign,
  signEvent,
} from '../nostr'

export const createDemoRideRequest = async () => {
  const { pubkey, privkey } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const nostrEventToSerialize: NostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: 60,
    tags: [],
    content: JSON.stringify({
      from: {
        lat: 30.2672,
        lng: -97.7431,
      },
      to: {
        lat: 30.2632,
        lng: -97.7441,
      },
      name: 'ArcadeTesto1',
      amount: 1337,
      expires: dateTimeInSeconds - 1,
    }),
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
  }
  return nostrEvent
}
