import { translate } from 'i18n'
import { capitalize } from 'lib/util'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores'
import { ServiceRequest, ServiceRequestStatus } from 'stores/service-store'
import { PlayerDetail } from 'views/player'
import { Icon, Text } from 'views/shared'
import { color } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

interface Props {
  activeOpacity?: number
  request: ServiceRequest
}

export const RequestDetail = observer(({ activeOpacity, request }: Props) => {
  const fromNow = moment(request.createdAt).utcOffset(-10, true).fromNow() // previously when
  const { navigate } = useNavigation<any>()
  const { authStore, serviceStore } = useStores()
  console.log(request)
  if (!request.playerRequesting) return null

  let statusText
  let backgroundColor = color.palette.portGore

  // TODO: Refactor statustext into MST view for request detail and status bar
  switch (request.status) {
    case ServiceRequestStatus.AWAITING_DRIVERS:
      statusText = translate('service.needsDriver')
      backgroundColor = color.palette.minsk
      break
    case ServiceRequestStatus.CANCELLED_BY_RIDER:
      statusText = translate('service.cancelledByRider')
      backgroundColor = color.palette.haiti
      break
    case ServiceRequestStatus.CLAIMED:
      statusText = `${translate('service.driver')}: ${
        request.playerClaiming?.username
      }`
      break
    case ServiceRequestStatus.RESOLVED_BY_RIDER:
      statusText = translate('service.resolvedByRider')
      backgroundColor = color.palette.haiti // TODO: if its these folks
      break
    default:
      statusText = request.status
      break
  }

  const pickup = request.addresses[0] // request.pickup
  const drop = request.addresses[1] // .drop

  if (!pickup || !drop || !pickup.coords || !drop.coords) return null

  const pickupDistance = authStore.distance(pickup.coords)
  const dropDistance = authStore.distance(drop.coords)

  // console.tron.display({
  //     name: 'RequestDetail',
  //     preview: 'Heres the request',
  //     value: request,
  //     important: true,
  // })

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ?? 0.7}
      key={`${request.id}-${authStore?.locale}`}
      style={{
        width: '100%',
        padding: 20,
        backgroundColor,
        borderRadius: 8,
      }}
      onPress={() => {
        serviceStore.setActiveRequest(request.id)
        navigate('requestChat')
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text
            text={`${capitalize(request.type)} ${translate('service.request')}`}
            preset='bold'
          />
          <Text text={fromNow} preset='descriptionSlim' />
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Text text={`${statusText}`} preset='bold' />
          <Text
            text={`${request?.chatroom?.messages.length ?? 0} ${translate(
              'service.comments'
            )}`}
            preset='descriptionSlim'
          />
        </View>
      </View>

      <PlayerDetail player={request.playerRequesting} />

      {!!request.details && (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <View
            style={{
              marginLeft: 10,
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}
          >
            <Icon name='inbox' />
          </View>
          <View>
            <Text text={`"${request.details}"`} />
          </View>
        </View>
      )}

      <View style={{ flexDirection: 'row', marginTop: 14 }}>
        <View
          style={{
            marginLeft: 10,
            height: 40,
            width: 40,
            justifyContent: 'center',
          }}
        >
          <Icon name='map' />
        </View>
        <View>
          <Text
            text={translate('service.distancePickup', {
              distance: pickupDistance,
            })}
          />
          <Text
            text={translate('service.distanceDropoff', {
              distance: dropDistance,
            })}
            preset='descriptionSlim'
          />
        </View>
      </View>
    </TouchableOpacity>
  )
})
