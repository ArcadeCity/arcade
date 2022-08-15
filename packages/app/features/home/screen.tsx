import React from 'react'
import { View } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme'
import { Aurora } from './Aurora'

export function HomeScreen() {
  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: color.background,
      }}>
      <Aurora />
    </View>
  )
}
