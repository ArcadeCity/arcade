import React from 'react'
import { Dimensions } from 'react-native'
import { Canvas, Image, Turbulence, DisplacementMap, useImage } from '@shopify/react-native-skia'

export const Filter = () => {
  const image = useImage(require('./splash.png'))
  if (!image) {
    return null
  }
  const { width, height } = Dimensions.get('window')
  return (
    <Canvas style={{ width, height }}>
      <Image image={image} x={0} y={0} width={width} height={height} fit='cover'>
        <DisplacementMap channelX='g' channelY='a' scale={20}>
          <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
        </DisplacementMap>
      </Image>
    </Canvas>
  )
}
