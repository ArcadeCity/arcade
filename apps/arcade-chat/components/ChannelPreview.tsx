import { Channel } from '@arcadecity/use-arcade'
import { useCallback } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export const ChannelPreview = ({ channel }: { channel: Channel }) => {
  const navToIt = useCallback(() => {
    console.log('Navigating to channel:', channel.id)
  }, [channel.id])
  return (
    <TouchableOpacity key={channel.id} onPress={navToIt} activeOpacity={0.8}>
      <Text style={{ color: '#EEECFB', padding: 10 }}>{channel.name}</Text>
    </TouchableOpacity>
  )
}
