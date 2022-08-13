import React from 'react'
import { View, H1, P } from 'dripsy'
import { color } from '@arcadecity/ui/src/theme/color'
import {
  // Channel,
  // useChannelsCreated,
  useNostr,
  // ArcadeContext,
  // UseArcadeRelayActions,
} from '@arcadecity/use-arcade/src/hooks/useNostr'

export function HomeScreen() {
  useNostr()

  return (
    <View
      sx={{
        flex: 1,
        alignItems: 'center',
        p: 16,
        backgroundColor: color.background,
      }}>
      <View style={{ paddingTop: 40 }}></View>
    </View>
  )
}
