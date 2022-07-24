import { useStore } from 'lib/nostr/store'
import { RideRequest as RideRequestType } from 'lib/nostr/types'
import { RootTabScreenProps } from 'navigation/types'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { RideRequest } from 'views/RideRequest'

export const FeedHome = ({ navigation }: RootTabScreenProps<'FeedHome'>) => {
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
