import React from 'react'
import { ChannelPreviewScreen } from '@arcadecity/ui/src'
import { ComponentPreview } from '@/components/ComponentPreview'
import { Channel } from '@/../../packages/use-arcade/src'
import { ChannelPreview } from '@/../../packages/ui/src/molecules/ChannelPreview'

const dummyChannel: Channel = {
  id: '1',
  name: 'Demo Nostr Chat Channel',
  about: 'Austin Arcadians sharing rides and stuff',
  picture: 'http://placekitten.com/200/300',
  type: 'public',
  pubkey: 'abcdef',
  created_at: Date.now(),
  kind: 40,
  tags: [],
  content: '',
  sig: 'asdf',
}

const codeChannelPreview = `<ChannelPreview
  channel={channel}
  onPress={() => console.log(channel.id)}
/>`

const codeMessagePreview = `<MessagePreview
  message={message}
  onPress={() => console.log(message.id)}
/>`

const descriptionChannelPreview = 'Preview channel details.'

const component = (
  <ChannelPreview channel={dummyChannel} onPress={() => console.log('Pressed ChannelPreview')} />
)

export default function () {
  return (
    <>
      {/* <ChannelPreviewScreen />f */}
      <ComponentPreview
        name='ChannelPreview'
        code={codeChannelPreview}
        component={component}
        description={descriptionChannelPreview}
        githubLink='https://github.com/ArcadeCity/arcade/tree/main/packages/ui/src/molecules/ChannelPreview.tsx'
      />

      {/* <ComponentPreview name='MessagePreview' code={codeMessagePreview} /> */}
    </>
  )
}
