import React from 'react'
import { View } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme'
import { Map } from '@arcadecity/ui/src/molecules'

export function HomeScreen() {
  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: color.background,
      }}
    >
      <Map />
    </View>
  )
}
