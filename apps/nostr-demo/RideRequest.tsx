import moment from 'moment'
import { TouchableOpacity, View } from 'react-native'
import { palette, Text } from '@arcadecity/ui'
import { Feather } from '@expo/vector-icons'
import { RideRequest as RideRequestType } from './store'

export const RideRequest = ({ request }: { request: RideRequestType }) => {
  const statusText = 'Unknown'
  const fromNow = moment(request.expires).fromNow()
  const pickupText = `2mi NW`
  const dropText = `3mi SE`
  // const dropDistance = `${distance(drop.coords)}mi SE`
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      key={request.id}
      style={{
        width: '96%',
        padding: 20,
        backgroundColor: palette.purple,
        borderRadius: 8,
      }}
      onPress={() => {
        console.log('Clicked request', request.id)
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text text={'Ride request'} preset='bold' />
          <Text text={`Expires ${fromNow}`} preset='descriptionSlim' />
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <Text text={`${statusText}`} preset='bold' />
          <Text
            text={`Paying: ${request.amount} sats`}
            // text={`${request?.chatroom?.messages.length ?? 0} ${translate(
            //   'service.comments'
            // )}`}
            preset='descriptionSlim'
          />
        </View>
      </View>

      {/* <PlayerDetail player={request.playerRequesting} /> */}

      {/* {!!request.details && (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <View
            style={{
              marginLeft: 10,
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}>
            <Icon name='inbox' />
          </View>
          <View>
            <Text text={`"${request.details}"`} />
          </View>
        </View>
      )} */}

      <View style={{ flexDirection: 'row', marginTop: 14 }}>
        <View
          style={{
            marginLeft: 10,
            height: 40,
            width: 40,
            justifyContent: 'center',
          }}>
          <Feather name='map-pin' size={20} color={palette.blueBell} />
        </View>
        <View>
          <Text text={pickupText} />
          <Text text={dropText} preset='descriptionSlim' />
        </View>
      </View>
    </TouchableOpacity>
  )

  // return (
  //   <View
  //     style={{
  //       backgroundColor: palette.purple,
  //       width: '100%',
  //       padding: 15,
  //       margin: 10,
  //       borderRadius: 10,
  //     }}>
  //     <Text style={{ color: palette.moonRaker }}>
  //       {request.id}- {request.amount}
  //     </Text>
  //   </View>
  // )
}
