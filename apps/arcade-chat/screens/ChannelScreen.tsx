import { useChannelMetadata } from '@arcadecity/use-arcade'
import { useEffect } from 'react'
import { View } from 'react-native'
import { MessageInput } from '../components/MessageInput'
import { MessageList } from '../components/MessageList'
import { RootStackScreenProps } from '../types'

export const ChannelScreen = ({ navigation }: RootStackScreenProps<'channel'>) => {
  const metadata = useChannelMetadata()
  // console.log(metadata)
  useEffect(() => {
    navigation.setOptions({ title: metadata.name })
  }, [metadata])
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MessageList />
      <MessageInput />
    </View>
  )
}
