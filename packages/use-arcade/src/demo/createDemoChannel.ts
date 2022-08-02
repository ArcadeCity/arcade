import {
  createNewAccount,
  getEventHash,
  NostrEvent,
  NostrEventToSerialize,
  NostrEventToSign,
  signEvent,
} from '../nostr'

export const createDemoChannel = async () => {
  const { pubkey, privkey } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const nostrEventToSerialize: NostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: 60,
    tags: [],
    content: JSON.stringify({
      image: 'http://placekitten.com/g/200/200',
      name: 'DemoChannel' + Math.floor(Math.random() * 10000),
      type: 'demo',
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
  console.log(nostrEvent)
  return nostrEvent
}
