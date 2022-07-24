import { NostrEvent } from 'lib/nostr'
import { normalizeRideRequestEvent } from 'lib/nostr/normalize'
import { RideRequest, RideRequestModel } from '../relay-models'
import { RelayStore } from '../relay-store'

export const initRideRequestDemo = async (self: RelayStore) => {
  const cb = (event: NostrEvent) => {
    const normalizedEvent = normalizeRideRequestEvent(event)
    if (!normalizedEvent) return
    const rideRequestModel = RideRequestModel.create({
      amount: normalizedEvent.amount,
      created_at: normalizedEvent.created_at,
      expires: normalizedEvent.expires,
      from: normalizedEvent.from,
      id: normalizedEvent.id,
      name: normalizedEvent.name,
      pubkey: normalizedEvent.pubkey,
      sig: normalizedEvent.sig,
      tags: normalizedEvent.tags,
      to: normalizedEvent.to,
      type: normalizedEvent.type,
    })
    self.addRequest(rideRequestModel)
  }
  self.env.nostr.subscribeToRides(cb, 5)
  return true
}
