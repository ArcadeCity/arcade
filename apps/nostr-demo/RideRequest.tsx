import { Text, View } from 'react-native'
import { palette } from '@arcadecity/ui'
import { RideRequest as RideRequestType } from './store'

export const RideRequest = ({ request }: { request: RideRequestType }) => {
  return (
    <View
      style={{
        backgroundColor: palette.purple,
        width: 500,
        maxWidth: '100%',
        padding: 15,
        margin: 10,
        borderRadius: 10,
      }}>
      <Text style={{ color: palette.moonRaker }}>
        {request.id}- {request.amount}
      </Text>
    </View>
  )
}
