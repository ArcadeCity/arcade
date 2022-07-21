import { StyleSheet, Text, View } from 'react-native'
import { palette, typography } from '@arcadecity/ui'
import { RideRequest } from './RideRequest'
import { RideRequest as RideRequestType } from './store'

export const RequestFeed = ({ requests }: { requests: RideRequestType[] }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: palette.moonRaker,
          fontSize: 34,
          fontFamily: typography.secondary,
          fontWeight: '700',
          marginVertical: 25,
        }}>
        Bullrun Ride Requests
      </Text>
      {requests.map((request) => (
        <RideRequest key={request.id} request={request} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    width: 500,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
