import { View } from 'react-native'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'

export const ChannelScreen = () => (
  <View style={{ flex: 1, width: '100%' }}>
    <MessageList />
    <MessageInput />
  </View>
)
