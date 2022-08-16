import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, H1, P } from 'dripsy'
import { color, palette } from '@arcadecity/ui/src/theme'
import { ChannelPreview } from '@arcadecity/ui/src/molecules/ChannelPreview'
import {
  Channel,
  useChannelsCreated,
  useNostr,
  ArcadeContext,
  UseArcadeRelayActions,
} from '@arcadecity/use-arcade/src'

export function ChatScreen() {
  useNostr()
  const channels: Channel[] = useChannelsCreated()
  const context = useContext(ArcadeContext) as any
  const actions = context.actions as UseArcadeRelayActions
  const createChannel = async () => {
    actions.createChannel('TestChannel2', 'About so good', 'https://placekitten.com/200/300')
  }

  return (
    <View
      sx={{
        flex: 1,
        alignItems: 'center',
        p: 16,
        backgroundColor: color.background,
      }}>
      <View style={{ flex: 1, width: '100%', paddingTop: 40 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={createChannel}
          style={{ backgroundColor: palette.electricIndigo, borderRadius: 10, marginVertical: 20 }}>
          <P sx={{ color: palette.moonRaker, fontWeight: 'bold', textAlign: 'center' }}>
            Create demo channel
          </P>
        </TouchableOpacity>
        <H1 sx={{ color: color.text, fontWeight: '800' }}>Channels: {channels.length}</H1>
        {channels.map((channel) => (
          <ChannelPreview
            key={channel.id}
            channel={channel}
            onPress={() => console.log(`Pressed channel ${channel.id}`)}
          />
        ))}
      </View>
    </View>
  )
}
