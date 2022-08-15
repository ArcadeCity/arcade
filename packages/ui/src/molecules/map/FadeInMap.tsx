import React from 'react'
import { View } from 'dripsy'
import { Map } from './map'

export const FadeInMap = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'absolute',
          zIndex: 7888,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Map />
    </>
  )
}
