import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import {
  Canvas,
  Image,
  Turbulence,
  DisplacementMap,
  useImage,
  mix,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

export const Filter = () => {
  const image = useImage(require('./splash.png'))

  const x = useValue(0)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true)
  }, [progress])

  useSharedValueEffect(() => {
    x.current = mix(progress.value, 0, 100)
  }, progress) // you can pass other shared values as extra parameters

  const { width, height } = Dimensions.get('window')
  if (!image) {
    return null
  }
  return (
    <Canvas style={{ width, height }}>
      <Image image={image} x={0} y={0} width={width} height={height} fit='cover'>
        <DisplacementMap channelX='g' channelY='a' scale={x}>
          <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
        </DisplacementMap>
      </Image>
    </Canvas>
  )
}
