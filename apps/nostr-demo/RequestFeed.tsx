import { StyleSheet, Text, View } from 'react-native'
import { RideRequest } from './store'

export const RequestFeed = ({ requests }: { requests: RideRequest[] }) => {
  return (
    <View style={styles.container}>
      {requests.map((request) => (
        <Text key={request.id}>
          {request.id} - {request.amount}
        </Text>
        // <Request key={request.id} request={request} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
