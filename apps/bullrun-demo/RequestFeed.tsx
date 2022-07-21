import { FlatList, StyleSheet, View } from 'react-native'
import { RideRequest } from './RideRequest'
import { RideRequest as RideRequestType } from './store'

export const RequestFeed = ({ requests }: { requests: RideRequestType[] }) => {
  const sortedRequests = requests
    .sort((a: RideRequestType, b: RideRequestType) => {
      return b.expires - a.expires
    })
    .slice(20)
  return (
    <View style={styles.container}>
      <FlatList
        data={sortedRequests}
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
    paddingVertical: 20,
    width: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
