import * as Location from 'expo-location'
import { display } from 'lib'
import { notify } from 'lib/error'
import { Alert } from 'react-native'
import { AuthApi } from 'services/api'
import { AuthStore, SimpleCoords as Coords } from 'stores/auth-store'

let fetching = false

export const getLocation = async (self: AuthStore) => {
  if (fetching) {
    return false
  }
  display({
    name: 'getLocation',
    preview: 'Grabbing location',
  })
  fetching = true
  try {
    const locationPermission = await Location.getForegroundPermissionsAsync()

    self.setLocationPermission(locationPermission)
    const { canAskAgain, status } = locationPermission
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({})
      self.setLocation(location)

      display({
        name: 'getLocation',
        preview: `${location.coords.latitude}, ${location.coords.longitude}`,
        value: location,
      })

      const coords: Coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      const cleanCoords: Coords = {
        latitude: parseFloat(location.coords.latitude.toFixed(2)),
        longitude: parseFloat(location.coords.longitude.toFixed(2)),
      }

      const geos = await Location.reverseGeocodeAsync(coords)
      const geo = geos[0]

      // @ts-ignore
      delete geo.street
      // @ts-ignore
      delete geo.name
      self.setGeo(geo)
      const api = new AuthApi(self.env.api)
      try {
        // display({
        //   name: 'getLocation',
        //   preview: `saveGeo`,
        //   value: { geo, cleanCoords },
        // })
        api.saveGeo(geo, cleanCoords)
      } catch (e) {
        display({
          name: 'getLocation',
          preview: `Error saving geo to DB`,
          value: e.message,
        })
      }

      display({
        name: 'getLocation',
        preview: `Fetched geo: ${geo.city}, ${geo.region}, ${geo.country}`,
        value: geo,
      })
    } else {
      display({
        name: 'getLocation',
        preview: `Requesting location permission because currently ${status}`,
        value: { locationPermission },
        important: true,
      })
      await Location.requestForegroundPermissionsAsync()
      const locationPermission2 = await Location.getForegroundPermissionsAsync()
      self.setLocationPermission(locationPermission2)

      if (status === Location.PermissionStatus.DENIED && !canAskAgain) {
        Alert.alert(
          'You denied location permission. Change this in your device settings to proceed.'
        )
      } else {
        await self.getLocation()
      }

      // display({
      //   name: 'getLocation ERROR',
      //   preview: `Location permission: ${status}`,
      //   value: { locationPermission },
      //   important: true,
      // })
      // Alert.alert(
      //   "Couldn't enable location - you may need to enable permission manually in your device's app settings."
      // )
    }

    fetching = false
    // self.rootStore.playerStore.fetchNearbyReport()

    return true
  } catch (e: any) {
    notify(e)
    display({
      name: 'notification',
      preview: 'Error fetching location permission',
      important: true,
      value: e.message,
    })

    fetching = false

    return false
  }
}
