import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { ViewStyle } from 'react-native'
// import MapboxGL, { SymbolLayerStyle } from '@rnmapbox/maps'
import { useStores } from 'stores'
import { Loading } from 'views/loading'

// import * as MapStyles from 'views/map/components/mapbox/mapbox.styles'

export const RequestMap: React.FC<{}> = observer(() => {
  // UI
  const [, setShow] = useState(true) // TODO

  // State
  const { serviceStore } = useStores()
  const activeRequest = serviceStore.activeRequest
  const pickup = activeRequest?.pickup
  const drop = activeRequest?.drop

  useEffect(() => {
    if (!activeRequest || !pickup || !drop) return
    serviceStore.fetchRequestRoute(activeRequest) // todo: update so no rerender if route same?
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }, [pickup, drop])

  if (!pickup || !drop || !pickup.coords || !drop.coords) {
    return <Loading message='Loading request' />
  }

  const pickupDropShape = activeRequest?.pickupDropShape
  const routeShape = activeRequest?.routeShape

  // Calculate camera bounds based on request locations
  const cameraBounds = {
    sw: [pickup.coords.longitude, pickup.coords.latitude],
    ne: [drop.coords.longitude, drop.coords.latitude],
    paddingLeft: 20,
    paddingRight: 40,
    paddingBottom: 50,
    paddingTop: 130,
  }

  // const thefuckinstyle: SymbolLayerStyle = {
  //   iconImage: '{icon}',
  //   iconSize: 0.1,
  //   iconAnchor: 'bottom',
  // }

  return <></>
  // return (
  //   <MapboxGL.MapView
  //     style={CONTAINER}
  //     styleURL={mapStyles.main}
  //     rotateEnabled={false}
  //     pitchEnabled={false}
  //   >
  //     <MapboxGL.Images
  //       images={{
  //         pickup: require('./marker.png'),
  //         drop: require('./marker.png'),
  //       }}
  //     />
  //     <MapboxGL.Camera
  //       bounds={cameraBounds}
  //       defaultSettings={{
  //         centerCoordinate: [pickup?.coords.longitude, pickup?.coords.latitude],
  //         zoomLevel: 16,
  //       }}
  //     />
  //     {routeShape && (
  //       <MapboxGL.ShapeSource id='route' shape={routeShape}>
  //         <MapboxGL.LineLayer
  //           id='routeFill'
  //           style={MapStyles.mapLayers.route}
  //         />
  //       </MapboxGL.ShapeSource>
  //     )}
  //     <MapboxGL.ShapeSource id='pickupDrop' shape={pickupDropShape}>
  //       <MapboxGL.SymbolLayer id='pickupDropImage' style={thefuckinstyle} />
  //     </MapboxGL.ShapeSource>
  //   </MapboxGL.MapView>
  // )
})

const CONTAINER: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: '#1c133a',
}

const mapStyles = {
  blank: 'mapbox://styles/aclions/cjoo2gldl3bio2rmktwhcy0qh',
  main: 'mapbox://styles/aclions/cjeai04xo08k02rozqsi9di5a',
}
