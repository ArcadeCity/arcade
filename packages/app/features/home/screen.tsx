import { useSx, View, H1, P, Row, A, Image } from 'dripsy'
import { TextLink } from 'solito/link'
import { color, palette } from '@arcadecity/ui'
import {
  Channel,
  useChannelsCreated,
  useArcadeRelay,
  ArcadeContext,
  UseArcadeRelayActions,
} from '@arcadecity/use-arcade/src/index'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

export function HomeScreen() {
  const sx = useSx()

  useArcadeRelay()
  const channels: Channel[] = useChannelsCreated()

  useEffect(() => {
    console.log(channels)
  }, [channels])

  const context = useContext(ArcadeContext) as any
  const actions = context.actions as UseArcadeRelayActions
  const createChannel = async () => {
    // console.log(name, picture)
    actions.createChannel('TestChannel1', 'Aboutsogood', 'https://placekitten.com/200/300')
  }

  return (
    <View
      sx={{
        flex: 1,
        alignItems: 'center',
        p: 16,
        backgroundColor: color.background,
      }}>
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={createChannel}>
          <P sx={{ color: palette.blueBell, textAlign: 'center' }}>Create demo channel</P>
        </TouchableOpacity>
        <H1 sx={{ color: color.text, fontWeight: '800' }}>Channels: {channels.length}</H1>
        {channels.map((channel) => (
          <Row key={channel.id} style={{ marginVertical: 10, alignItems: 'center' }}>
            <Image
              source={{ uri: channel.picture }}
              style={{ width: 70, height: 70, borderRadius: 35, marginRight: 20 }}
            />
            <P sx={{ color: palette.blueBell, textAlign: 'center' }}>
              {channel.name} - {channel.about}
            </P>
          </Row>
        ))}
      </View>
    </View>
  )
}
