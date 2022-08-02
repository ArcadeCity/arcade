import { Channel, NostrEvent, useChannelsCreated } from '@arcadecity/use-arcade'
import { FlatList, Text } from 'react-native'

export const ChannelList = () => {
  const channels: Channel[] = useChannelsCreated()
  return <FlatList data={channels} keyExtractor={keyExtractor} renderItem={renderItem} />
}

const keyExtractor = (item: Channel) => item.id

const renderItem = ({ item }: { item: Channel }) => <Text>{item.name}</Text>
