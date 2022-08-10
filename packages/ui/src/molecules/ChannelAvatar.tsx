import { ChannelMetadata } from '../../../use-arcade/src'
import { Image } from 'react-native'

export const ChannelAvatar = ({ metadata }: { metadata: ChannelMetadata }) => {
  const picture =
    metadata.picture && metadata.picture.length > 4
      ? metadata.picture
      : 'http://placekitten.com/200/300'
  return (
    <Image
      source={{ uri: picture }}
      style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
    />
  )
}
