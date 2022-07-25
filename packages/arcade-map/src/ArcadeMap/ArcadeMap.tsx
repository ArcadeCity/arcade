import React, { useEffect } from 'react'
import { MapView } from '@arcadecity/arcade-map/'

// import {
//   sphereProjection
// } from '@arcadecity/arcade-map/geoutils/projection/SphereProjection'

export const ArcadeMap = () => {
  console.log('Hello from ArcadeMap')
  useEffect(() => {
    // const mapView = new MapView({
    //   canvas,
    //   context,
    //   // projection: mercatorProjection,
    //   projection: sphereProjection,
    //   theme: 'resources/berlin_tilezen_base_globe.json',
    //   // theme: 'resources/arcade.json',
    // })
    // mapView.resize(window.innerWidth, window.innerHeight)
  }, [])

  return <></>
}
