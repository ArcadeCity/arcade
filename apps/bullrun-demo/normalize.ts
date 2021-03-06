import { RideRequest } from './store'

export const normalizeRideRequestEvent = (event: any) => {
  try {
    const content = JSON.parse(event.content)
    if (!content.to) return
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
      to: {
        lat: content.to.lat,
        lng: content.to.lng,
      },
      type: content.type,
    }
    console.log(rideRequest)
    return rideRequest
  } catch (e) {
    console.log('Could not normalize.', e)
    return undefined
  }
}
