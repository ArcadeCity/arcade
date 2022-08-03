import { Channel, ChannelMetadata } from '@arcadecity/use-arcade'
import { Image } from 'react-native'

export const ChannelAvatar = ({ metadata }: { metadata: ChannelMetadata }) => {
  return (
    <Image
      source={{ uri: metadata?.picture ?? 'http://placekitten.com/200/300' }}
      style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
    />
  )
}
