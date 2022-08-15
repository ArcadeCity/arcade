import React from 'react'
import { P, Text, View } from 'dripsy'
import { color, palette } from '@arcadecity/ui/src/theme'
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
          bottom: 150,
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
          bottom: 50,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9010,
        }}>
        <Button width={300} height={70}>
          <P
            sx={{
              color: palette.moonRaker,
              fontSize: 20,
              letterSpacing: 2,
              textAlign: 'center',
              fontWeight: '700',
            }}>
            JOIN ARCADE CITY
          </P>
        </Button>
      </View>
    </View>
  )
}

export default HomeScreen
