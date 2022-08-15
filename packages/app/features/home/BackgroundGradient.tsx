import {
  BlurMask,
  Canvas,
  RoundedRect,
  Group,
  SweepGradient,
  useClockValue,
  useComputedValue,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia'
import React, { useEffect } from 'react'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { palette } from 'ui/src'

type BackgroundGradientProps = {
  width: number
  height: number
  radius?: number
  subtle?: boolean
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(
  ({ width, height, radius = 20, subtle = false }) => {
    const canvasPadding = 40
    const rValue = useSharedValue(0)
    const skValue = useValue(0)

    useEffect(() => {
      rValue.value = withRepeat(withTiming(5, { duration: 2000 }), -1, true) // 10
    }, [rValue])

    useSharedValueEffect(() => {
      skValue.current = rValue.value
    }, rValue)

    const mainColors = [palette.electricIndigo, palette.electricViolet, palette.electricIndigo]
    // const mainColors = [palette.blueBright, 'cyan', palette.blueBright]
    const subtleColors = ['#777']

    const clock = useClockValue()

    return (
      <Canvas
        style={{
          width: width + canvasPadding,
          height: height + canvasPadding,
        }}>
        {!subtle && (
          <RoundedRect
            x={canvasPadding / 2}
            y={canvasPadding / 2}
            width={width}
            height={height}
            color={'white'}
            r={radius}>
            <SweepGradient
              c={vec((width + canvasPadding) / 2, (height + canvasPadding) / 2)}
              colors={subtle ? subtleColors : mainColors}
            />
            <BlurMask blur={4} style={'solid'} />
          </RoundedRect>
        )}
      </Canvas>
    )
  }
)

export { BackgroundGradient }
