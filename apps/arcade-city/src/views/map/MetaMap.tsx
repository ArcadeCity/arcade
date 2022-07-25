import { ExpoWebGLRenderingContext } from 'expo-gl'
import React, { useEffect } from 'react'
import { PerspectiveCamera, Scene } from 'three'
import { useThree } from '@react-three/fiber/native'
import { ArcadeMapView, ArcadeMapViewOptions } from './ArcadeMapView'

export const MetaMap = ({ canvas, context }: ArcadeMapProps) => {
  const three = useThree()
  useEffect(() => {
    if (!canvas || !context) {
      console.log('[ArcadeMap] No canvas or gl, returning null.')
      return
    }
    if (!three.scene) return
    console.log("[ArcadeMap] Let's do it.")
    const camera = three.camera as PerspectiveCamera
    const scene = three.scene as Scene
    console.log(`FOV before: ` + camera.fov)
    const mapViewOptions: ArcadeMapViewOptions = {
      camera,
      scene,
      zoomLevel: 15,
      canvas,
      // context,
    }
    console.log('mapViewOptions:', mapViewOptions)
    let mapView: any = new ArcadeMapView(mapViewOptions)
    mapView.setup()
  }, [three.scene, canvas, context])
  return <></>
}

interface ArcadeMapProps {
  canvas: HTMLCanvasElement | null | undefined
  // context: WebGLRenderingContext | null | undefined
  context: ExpoWebGLRenderingContext | null | undefined
}
