import { Channel, useChannelsCreated } from '@arcadecity/use-arcade'
import { FlatList, StyleSheet, Text } from 'react-native'

export const ChannelList = () => {
  const channels: Channel[] = useChannelsCreated()
  return (
    <FlatList
      data={channels}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={[styles.flatList, { backgroundColor: '#120B29' }]}
    />
  )
}

const keyExtractor = (item: Channel) => item.id

const renderItem = ({ item }: { item: Channel }) => (
  <Text style={{ color: '#EEECFB' }}>{item.name}</Text>
)

const styles = StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: 'absolute', right: 0, top: 0 },
})
