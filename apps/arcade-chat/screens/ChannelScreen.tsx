import { StyleSheet, View } from 'react-native'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'
import { RootStackScreenProps } from '../types'

export const ChannelScreen = ({ route }: RootStackScreenProps<'channel'>) => {
  const channelId = route.params.channelId
  console.log(channelId)
  return (
    <View style={{ flex: 1 }}>
      <MessageList />
      <MessageInput />
    </View>
  )
}
