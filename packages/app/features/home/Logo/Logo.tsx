import React from 'react'
import { Canvas, Image, useImage } from '@shopify/react-native-skia'

export const Logo = () => {
  const image = useImage(require('./aclogo512.png'))
  const height = 160
  const width = 160
  if (!image) {
    return null
  }
  return (
    <Canvas style={{ width, height }}>
      <Image image={image} x={0} y={0} width={width} height={height} fit='contain'></Image>
    </Canvas>
  )
}
