import { useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { color, palette } from '@arcadecity/ui'
import { Channel, useChannelsCreated, useArcadeRelay } from '@arcadecity/use-arcade/src/index'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect } from 'react'

export function HomeScreen() {
  const sx = useSx()

  useArcadeRelay()
  const channels: Channel[] = useChannelsCreated()

  useEffect(() => {
    console.log(channels)
  }, [channels])

  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        p: 16,
        backgroundColor: color.background,
      }}>
      <H1 sx={{ color: color.text, fontWeight: '800' }}>Channels: {channels.length}</H1>
      {channels.map((channel) => (
        <P sx={{ color: palette.blueBell, textAlign: 'center' }}>{channel.name}</P>
      ))}
    </View>
  )
}
