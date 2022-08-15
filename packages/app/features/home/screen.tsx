import React from 'react'
import { View } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme'
import { Wallpaper } from './Wallpaper'

export function HomeScreen() {
  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: color.background,
      }}>
      <Wallpaper />
    </View>
  )
}

export default HomeScreen
