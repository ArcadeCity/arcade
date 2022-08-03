import { Message } from '@arcadecity/use-arcade'
import { Text, TouchableOpacity } from 'react-native'

export const MessagePreview = ({ message }: { message: Message }) => {
  return (
    <TouchableOpacity key={message.id} activeOpacity={0.8}>
      <Text style={{ color: '#EEECFB', padding: 10 }}>{message.text}</Text>
      <Text style={{ color: '#EEECFB', padding: 10 }}>{message.created_at}</Text>
      <Text style={{ color: '#EEECFB', padding: 10 }}>{message.pubkey}</Text>
    </TouchableOpacity>
  )
}
