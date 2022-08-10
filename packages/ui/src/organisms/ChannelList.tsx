import React from 'react'
import { Channel } from '@arcadecity/use-arcade'
import { FlatList, StyleSheet } from 'react-native'
import { ChannelPreview } from '../molecules/ChannelPreview'

interface ChannelListProps {
  channels: Channel[]
}

export const ChannelList = ({ channels }: ChannelListProps) => {
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
  <ChannelPreview channel={item} onPress={() => console.log('bro')} />
)

const styles = StyleSheet.create({
  flatList: { flex: 1 },
  flatListContentContainer: { flexGrow: 1 },
  statusIndicator: { left: 0, position: 'absolute', right: 0, top: 0 },
})
