import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { RideRequest as RideRequestType } from '../lib/nostr/types'
import { RideRequest } from './RideRequest'

export const RequestFeed = ({ requests }: { requests: RideRequestType[] }) => {
  const sortedRequests = requests
    .sort((a: RideRequestType, b: RideRequestType) => {
      return b.expires - a.expires
    })
    .slice(20)
  const key = 'id'
  const arrayUniqueByKey = [...new Map(sortedRequests.map((item) => [item[key], item])).values()]
  return (
    <View style={styles.container}>
      <FlatList
        data={arrayUniqueByKey}
        renderItem={({ item }) => <RideRequest request={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
