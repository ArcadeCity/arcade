import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { WebView } from 'react-native-webview'

export const Map = () => {
  return (
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
      <WebView source={{ uri: 'https://arcade.city/bg' }} />
    </View>
  )
}
