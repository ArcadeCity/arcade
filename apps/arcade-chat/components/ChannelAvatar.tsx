import { Channel } from '@arcadecity/use-arcade'
import { Image } from 'react-native'

export const ChannelAvatar = ({ channel }: { channel: Channel }) => {
  return (
    <Image
      source={{ uri: channel.image }}
      style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
    />
  )
}
