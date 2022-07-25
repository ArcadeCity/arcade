// import { MapView, MapViewOptions } from '@here/harp-mapview'
import { PerspectiveCamera, Scene } from 'three'
// import { GeoCoordinates } from '@here/harp-geoutils'
// import { defaultOmvDataSource } from './defaultOmvDataSource'
import { GeoCoordinates, MapView, MapViewOptions } from '@arcadecity/arcade-map'

// import { GeoCoordinates } from '@arcadecity/arcade-map/src/geoutils'

export class ArcadeMapView extends MapView {
  constructor(options: ArcadeMapViewOptions) {
    if (!options.theme) {
      options.theme =
        'https://unpkg.com/@here/harp-map-theme@0.27.1/resources/berlin_tilezen_night_reduced.json'
    }
    super(options)
    // setInterval(this.report.bind(this), 5000)
  }

  setup() {
    this.renderLabels = false
    this.lookAtAustin()
    // this.addDataSource(defaultOmvDataSource)
    this.update()
    this.report()
    setTimeout(() => {
      this.report()
    }, 3000)
  }

  report() {
    this.update()
    const worldCoords = this.getGeoCoordinatesAt(
      this.camera.position.x,
      this.camera.position.y,
      true
    )
    const fov = Math.round(this.camera.fov)
    const lat = Math.round(this.geoCenter.lat * 100) / 100
    const lng = Math.round((this.geoCenter.lng * 100) / 100)
    const altitude = Math.round(this.geoCenter.altitude as number)
    console.tron.display({
      name: 'ArcadeMapView',
      preview: `FOV: ${fov}, (${lat}, ${lng}) - Altitude ${altitude}`,
      value: {
        geoCenter: this.geoCenter,
        // arcadeMap: this,
        camera: this.camera,
        cameraRotation: this.camera.rotation,
        worldCoords,
        scene: this.scene,
        // sceneEnvironment: this.sceneEnvironment,
      },
    })
    // console.tron.log(this.sceneEnvironment)
  }

  lookAtAustin() {
    // this.lookAt({
    //   target: new GeoCoordinates(30.2672, -97.7431),
    //   tilt: 0,
    //   zoomLevel: 6,
    //   heading: 0,
    // })

    // WORKS FOR PART OF GLOBE
    this.lookAt({
      target: new GeoCoordinates(30.2672, -97.7431, 100),
      tilt: 30, //45,
      zoomLevel: 3,
      heading: 0, //45,
    })
  }
}

export interface ArcadeMapViewOptions extends MapViewOptions {
  camera: PerspectiveCamera
  scene: Scene
}
