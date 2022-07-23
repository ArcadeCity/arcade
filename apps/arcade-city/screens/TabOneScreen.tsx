import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { spacing, Text } from '@arcadecity/ui'
import { useStore } from '../src/lib/nostr/store'
import {
  NostrEvent, RideRequest as RideRequestType
} from '../src/lib/nostr/types'
import { RequestFeed } from '../src/views/RequestFeed'
import { RideRequest } from '../src/views/RideRequest'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const events = useStore((s) => s.requests)
  const sortedEvents = events
    .sort((a: RideRequestType, b: RideRequestType) => {
      return b.created_at - a.created_at
    })
    .slice(20)
  const key = 'id'
  const arrayUniqueByKey = [...new Map(sortedEvents.map((item) => [item[key], item])).values()]
  return (
    <View style={styles.container}>
      <FlatList
        data={arrayUniqueByKey}
        renderItem={({ item }: { item: RideRequestType }) => <RideRequest request={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
