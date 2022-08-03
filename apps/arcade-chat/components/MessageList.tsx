import { color, Text } from '@arcadecity/ui'
import { useActiveChannelId, useChannelMessages } from '@arcadecity/use-arcade'
import { StyleSheet, View } from 'react-native'

export const MessageList = () => {
  const activeChannelId = useActiveChannelId()
  if (!activeChannelId) return <></>
  const messages = useChannelMessages(activeChannelId)
  return (
    <View style={styles.container}>
      <Text text={messages.length.toString()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
})
