import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { color } from 'views/theme'

export const Map = () => {
  let overlayOpacity = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.sequence([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.delay(1750),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 2750,
        useNativeDriver: true,
      }),
    ]).start()

    // Whenever one of these things change, - put
    // a transition overlay over it that fades out
  }, [])
  return (
    <>
      <Animated.View
        pointerEvents='none'
        style={{
          flex: 1,
          backgroundColor: color.background,
          opacity: overlayOpacity,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {/* <WebView source={{ uri: 'https://arcade.city/terminal' }} /> */}
        <WebView source={{ uri: 'https://arcade.city/bg' }} />
      </View>
    </>
  )
}
