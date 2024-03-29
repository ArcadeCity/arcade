import React from 'react'
import { P, View } from 'dripsy'
import { palette } from '@arcadecity/ui/src/theme'
import { Wallpaper } from './Wallpaper'
import { Logo } from './Logo'
import { Button } from './Button'
import { Platform, TouchableOpacity } from 'react-native'
import { FadeInMap } from '@arcadecity/ui/src/molecules/map/FadeInMap'

const background = Platform.OS === 'web' ? <Wallpaper /> : <FadeInMap />

export function HomeScreen({ navigation }) {
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

      {background}

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
        <Button width={300} height={70} onPress={() => console.log('Join')}>
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

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
          <P
            sx={{
              // color: palette.moonRaker,
              fontSize: 16,
              letterSpacing: 0.5,
              textAlign: 'center',
              fontWeight: '500',
            }}>
            Enter access code
          </P>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen
