import { ServiceRequest } from '../service-models'
import { ServiceStore } from '../service-store'
import { display } from 'lib'

export const fetchRequestRoute = async (
  self: ServiceStore,
  request: ServiceRequest
) => {
  const route = await findPath(
    self,
    request.pickup?.coords,
    request.drop?.coords
  )
  const freshRequest = self.activeRequest
  freshRequest?.setRoute(route)
  display({
    name: 'fetchRequestRoute',
    preview: 'Fetched request route',
    value: request,
  })
  return true
}

const findPath = async (self: any, pickup: any, drop: any) => {
  const pickupCoordinate = pickup
  const dropCoordinate = drop
  const result: any = await self.env.mapbox.getPath(
    pickupCoordinate,
    dropCoordinate
  )
  if (result.routes && result.routes.length > 0) {
    const currentRouteObject = result.routes[0]
    const currentRoute = {
      coordinate: currentRouteObject.geometry.coordinates,
      type: currentRouteObject.geometry.type,
      weight_name: currentRouteObject.weight_name,
      weight: currentRouteObject.weight,
      duration: currentRouteObject.duration,
      distance: currentRouteObject.distance,
      uuid: result.uuid,
    }

    return currentRoute
  }

  return undefined
}
