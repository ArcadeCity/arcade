import React, { useEffect } from 'react'
import { Image, ImageStyle, ViewStyle } from 'react-native'
import { images } from 'views/theme'
import { a, useSpring } from '@react-spring/native'

export const LoadSplash = ({ ready = false }) => {
  const [styles, api] = useSpring(() => ({ opacity: 1 }))

  useEffect(() => {
    setTimeout(() => {
      api.start({ opacity: ready ? 0 : 1 })
    }, 500)
  }, [ready])

  return (
    <a.View style={{ ...CONTAINER, ...styles }} pointerEvents='none'>
      <Image source={images.splash} style={CITYIMAGE} />
    </a.View>
  )
}

const CONTAINER: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  zIndex: 9999,
  height: '100%',
}

const CITYIMAGE: ImageStyle = {
  resizeMode: 'cover',
  width: '100%',
  height: '100%',
}
