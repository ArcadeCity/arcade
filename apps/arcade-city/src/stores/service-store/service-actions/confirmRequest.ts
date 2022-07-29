import { NostrEventToSerialize } from 'lib/nostr'
import { createNewAccount, pool } from 'lib/nostr/nostr'
import { ServiceRequest } from '../service-models'
import { ServiceStore } from '../service-store'

export const confirmRequest = async (self: ServiceStore) => {
  if (!self.activeRequest) return false

  const request: ServiceRequest = self.activeRequest

  const { pubkey } = createNewAccount()
  const date = new Date()
  const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
  const nostrEventToSerialize: NostrEventToSerialize = {
    created_at: dateTimeInSeconds,
    kind: 60,
    tags: [],
    content: JSON.stringify({
      from: {
        lat: request.pickup?.coords?.latitude,
        lng: request.pickup?.coords?.longitude,
      },
      to: {
        lat: request.drop?.coords?.latitude,
        lng: request.drop?.coords?.longitude,
      },
      name: 'Anon',
      amount: 1337,
      expires: dateTimeInSeconds - 1,
    }),
    pubkey,
  }

  console.log('confirmRequest:', request)
  pool.publish(nostrEventToSerialize)

  return true
}
