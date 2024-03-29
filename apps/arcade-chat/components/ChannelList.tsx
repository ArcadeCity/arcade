import { Channel, useChannelsCreated } from '@arcadecity/use-arcade'
import { FlatList, StyleSheet } from 'react-native'
import { ChannelPreview } from './ChannelPreview'

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

const renderItem = ({ item }: { item: Channel }) => <ChannelPreview channel={item} />

const styles = StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: 'absolute', right: 0, top: 0 },
})
