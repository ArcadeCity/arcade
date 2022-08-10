import { View, Text } from 'dripsy'
import { TextLink } from 'solito/link'
import { Channel } from '../../../use-arcade/src'
import { ChannelPreview } from '../molecules/ChannelPreview'
import { color } from '../theme'

export function ChannelPreviewScreen() {
  const dummyChannel: Channel = {
    id: '1',
    name: 'Dummy Channel',
    about: 'This is a dummy channel',
    picture: 'http://placekitten.com/200/300',
    type: 'public',
    pubkey: 'abcdef',
    created_at: Date.now(),
    kind: 40,
    tags: [],
    content: '',
    sig: 'asdf',
  }
  return (
    <View
      sx={{
        backgroundColor: color.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>{`Hello!`}</Text>
      <TextLink href='/'>👈 Go Home</TextLink>
      <TextLink href='/components'>👈 Components</TextLink>
      <View style={{ height: 60 }} />
      <ChannelPreview
        channel={dummyChannel}
        onPress={() => console.log('Pressed ChannelPreview')}
      />
    </View>
  )
}
