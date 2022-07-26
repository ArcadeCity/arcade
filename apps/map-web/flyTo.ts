import * as THREE from 'three'
import { GeoCoordinates } from '@here/harp-geoutils'
import {
  CameraAnimationBuilder, CameraKeyTrackAnimation, ControlPoint
} from '@here/harp-map-controls'
import { MapView } from '@here/harp-mapview'

export const flyTo = (coords: GeoCoordinates, map: MapView) => {
  stopAnimation()

  if (coords) {
    const target = new ControlPoint({
      target: coords,
      distance: 200,
      tilt: 0,
      // heading: 0,
      // heading: Math.random() * 360,
      timestamp: 1,
    })
    const flyToOpts = CameraAnimationBuilder.createBowFlyToOptions(
      map,
      new ControlPoint({
        ...CameraAnimationBuilder.getLookAtFromView(map),
        timestamp: 0,
      }),
      target
      // 6000
    )
    Object.assign(flyToOpts, animationOptions)
    cameraAnimation = new CameraKeyTrackAnimation(map, flyToOpts)
    console.log('cameraAnimation:', cameraAnimation)
    cameraAnimation.start()
  }
}

function stopAnimation() {
  if (cameraAnimation) {
    cameraAnimation.stop()
    cameraAnimation = undefined
    animOptions.flyOver = false
    animOptions.orbit = false
  }
}

const animOptions = {
  globe: true,
  orbit: false,
  flyTo: 'Dubai',
  flyOver: false,
}

const animationOptions = {
  interpolation: THREE.InterpolateSmooth,
  loop: THREE.LoopOnce,
  repetitions: 1,
  rotateOnlyClockWise: true,
}

let cameraAnimation: CameraKeyTrackAnimation | undefined
