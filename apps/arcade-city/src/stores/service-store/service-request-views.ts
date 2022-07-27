import { toJS } from 'mobx'
import {
  feature,
  Feature,
  featureCollection,
  FeatureCollection,
} from '@turf/helpers'

export const pickupDropShape = (self: any) => {
  const pickupAddress = toJS(self.pickup)
  const dropAddress = toJS(self.drop)

  const pickupFeature: Feature = feature(
    {
      type: 'Point',
      coordinates: [
        pickupAddress.coords.longitude,
        pickupAddress.coords.latitude,
      ],
    },
    {
      id: 'pickup1', // pickupAddress.locationId,
      icon: 'pickup',
      type: 'pickupDrop',
    }
  )

  const dropFeature: Feature = feature(
    {
      type: 'Point',
      coordinates: [dropAddress.coords.longitude, dropAddress.coords.latitude],
    },
    {
      id: 'drop1', // dropAddress.locationId,
      icon: 'drop',
      type: 'pickupDrop',
    }
  )

  const playersCollection: FeatureCollection = featureCollection([
    pickupFeature,
    dropFeature,
  ])

  return playersCollection
}

export const routeShape = (self: any) => {
  const route = toJS(self.route)

  if (route) {
    const routeShapeObj = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route.coordinate,
          },
        },
      ],
    }
    return routeShapeObj
  }
  return undefined
}
