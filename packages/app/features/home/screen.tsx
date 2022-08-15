import React from 'react'
import { Text, View } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme'
import { Wallpaper } from './Wallpaper'
import { Logo } from './Logo'
import { Button } from './Button'

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

      <View
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9010,
        }}>
        <Button width={200}>
          <Text sx={{ color: 'white' }}>JOIN ARCADE CITY</Text>
        </Button>
      </View>
    </View>
  )
}

export default HomeScreen
