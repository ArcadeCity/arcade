import { RideRequest } from './store'

export const normalizeRideRequestEvent = (event: any) => {
  const content = JSON.parse(event.content)
  const rideRequest: RideRequest = {
    amount: content.amount,
    created_at: event.created_at,
    expires: content.expires,
    from: {
      lat: content.from.lat,
      lng: content.from.lng,
    },
    id: event.id,
    name: content.name,
    pubkey: event.pubkey,
    sig: event.sig,
    tags: event.tags,
    type: content.type,
  }
  console.log(rideRequest)
  return rideRequest
}
