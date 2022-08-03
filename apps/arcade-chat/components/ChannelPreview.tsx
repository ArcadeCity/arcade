import { Channel, setActiveChannelId } from '@arcadecity/use-arcade'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export const ChannelPreview = ({ channel }: { channel: Channel }) => {
  const navigation = useNavigation()
  const navToIt = useCallback(() => {
    setActiveChannelId(channel.id)
    navigation.navigate('channel', { channelId: channel.id })
  }, [channel.id])
  return (
    <TouchableOpacity key={channel.id} onPress={navToIt} activeOpacity={0.8}>
      <Text style={{ color: '#EEECFB', padding: 10 }}>{channel.name}</Text>
    </TouchableOpacity>
  )
}
