import React from 'react'
import { Canvas, Image, Turbulence, DisplacementMap, useImage } from '@shopify/react-native-skia'

export const Filter = () => {
  const image = useImage(require('./oslo.jpg'))
  if (!image) {
    return null
  }
  return (
    <Canvas style={{ width: 256, height: 256 }}>
      <Image image={image} x={0} y={0} width={256} height={256} fit='cover'>
        <DisplacementMap channelX='g' channelY='a' scale={20}>
          <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
        </DisplacementMap>
      </Image>
    </Canvas>
  )
}
