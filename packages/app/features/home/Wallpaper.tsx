import { Canvas, LinearGradient, Fill, vec } from '@shopify/react-native-skia'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { palette } from 'ui/src'

export const Wallpaper = () => {
  const { height } = useWindowDimensions()
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height)}
          colors={[palette.purple, palette.haiti]}
        />
      </Fill>
    </Canvas>
  )
}
