import { ExpoWebGLRenderingContext } from 'expo-gl'
import React, { useState } from 'react'
import { Canvas, RootState } from '@react-three/fiber/native'
import { MetaMap } from './MetaMap'

export const ArcadeMap = () => {
  const [cv, setCv] = useState<HTMLCanvasElement | null>()
  const [context, setContext] = useState<ExpoWebGLRenderingContext | null>()

  const onCreated = async (state: RootState) => {
    const context = state.gl.getContext() as ExpoWebGLRenderingContext
    const canvas = state.gl.domElement
    setContext(context)
    setCv(canvas)
  }

  return (
    <Canvas onCreated={onCreated} camera={{ position: [0, 10, 0] }}>
      <color attach='background' args={[0x1c133a]} />
      <fog attach='fog' color='#1c133a' near={10} far={400} />
      <pointLight position={[10, 10, 10]} />
      <ambientLight intensity={0.8} />
      {/* <Tile position={[0, 1, -16]} rotation={[Math.PI / 2, 0, 0]} /> */}
      <MetaMap canvas={cv} context={context} />
      {/* <Stars /> */}
      {/* <DeviceOrientationControls /> */}
    </Canvas>
  )
}
