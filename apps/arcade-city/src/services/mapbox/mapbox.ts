import axios from 'axios'
import { Coords } from 'stores/service-store'

export interface MapboxConfig {
  accessToken: string
  baseUrl: string
}

export class Mapbox {
  accessToken: string
  baseUrl: string

  constructor(config: MapboxConfig) {
    this.accessToken = config.accessToken
    this.baseUrl = config.baseUrl
  }

  getAddress = (coordinate: number[]) => {
    const url = `${this.baseUrl}${coordinate[0]},${coordinate[1]}.json?access_token=${this.accessToken}`
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log('error:: ', error)
          reject(error)
        })
    })
  }

  getPath = (pickupCoordinate: any, dropCoordinate: any) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinate.longitude},${pickupCoordinate.latitude};${dropCoordinate.longitude},${dropCoordinate.latitude}?geometries=geojson&access_token=${this.accessToken}`

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log('error:: ', error)
          reject(error)
        })
    })
  }

  // Method to get related address from search string
  getAddressFromLocation = (locationText: string, userCoords: Coords) => {
    const url = `${this.baseUrl}${locationText}.json?access_token=${this.accessToken}&proximity=${userCoords.longitude},${userCoords.latitude}&types=address,poi`
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log('error:: ', error)
          reject(error)
        })
    })
  }
}
