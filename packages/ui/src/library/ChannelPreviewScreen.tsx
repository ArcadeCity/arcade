import { H1, P, View, Text } from 'dripsy'
import { TextLink } from 'solito/link'
import { Channel } from '../../../use-arcade/src'
import { ChannelPreview } from '../molecules/ChannelPreview'
import { color } from '../theme'
import Highlight, { defaultProps } from 'prism-react-renderer'
import clsx from 'clsx'

const codeLanguage = 'typescript'
const code = `<ChannelPreview
  channel={channel}
  onPress={() => console.log("Pressed channel", channel.id")}
/>`

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
        alignItems: 'center',
        backgroundColor: color.background,
        flex: 1,
        paddingTop: 40,
      }}>
      <H1>ChannelPreview</H1>

      <View style={{ height: 20 }} />
      <ChannelPreview
        channel={dummyChannel}
        onPress={() => console.log('Pressed ChannelPreview')}
      />

      <View style={{ height: 30 }} />

      <Highlight {...defaultProps} code={code} language={codeLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={clsx(className, 'flex overflow-x-auto pb-6')}
            style={{ ...style, padding: 12, borderRadius: 10 }}>
            <code className='px-4'>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </View>
  )
}
