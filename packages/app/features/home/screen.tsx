import React from 'react'
import { View } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme'
import { Wallpaper } from './Wallpaper'
import { Logo } from './Logo'

export function HomeScreen() {
  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9000,
        }}>
        <Logo />
      </View>
      <Wallpaper />
    </View>
  )
}

export default HomeScreen
