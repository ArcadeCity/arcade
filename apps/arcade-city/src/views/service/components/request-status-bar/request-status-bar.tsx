import React from 'react'
import { Alert, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import * as Linking from 'expo-linking'
import { useStores } from 'stores'
import { ServiceRequest, ServiceRequestStatus } from 'stores/service-store'
import { Button, Text } from 'views/shared'
import { color } from 'views/theme'
import { useNavigation } from '@react-navigation/native'
import { translate } from 'i18n'
import { capitalize } from 'lodash'

interface Props {
  request: ServiceRequest
}

export const RequestStatusBar = observer(({ request }: Props) => {
  const { authStore, serviceStore } = useStores()
  const { goBack } = useNavigation<any>()

  if (!request.playerRequesting) return null

  const userId = authStore.id

  const navigateToPickup = () => {
    let daddr = encodeURIComponent(`${request.pickup?.prettyName}`)

    Linking.openURL(`http://maps.google.com/?daddr=${daddr}`)
  }

  const resolve = () => {
    Alert.alert(
      translate('service.resolveYourRequest'),
      translate('service.resolveYourRequestExplainer'),
      [
        {
          text: translate('service.yesResolved'),
          onPress: () => serviceStore.resolveRequest(),
          // style: 'destructive',
        },
        {
          text: capitalize(translate('common.no')),
          style: 'cancel',
        },
      ]
    )
  }

  const cancel = () => {
    Alert.alert(
      translate('service.cancelConfirm'),
      translate('service.cancelConfirmAreYouSure'),
      [
        {
          text: translate('service.yesCancel'),
          onPress: () => {
            goBack()
            serviceStore.cancelRequest()
          },
          style: 'destructive',
        },
        {
          text: capitalize(translate('common.no')),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    )
  }

  let statusText
  let backgroundColor = color.palette.portGore
  switch (request.status) {
    case ServiceRequestStatus.AWAITING_DRIVERS:
      statusText = translate('service.awaitingDrivers')
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
      backgroundColor = color.palette.electricViolet // TODO: if its these folks
      break
    case ServiceRequestStatus.RESOLVED_BY_RIDER:
      statusText = translate('service.resolvedByRider')
      backgroundColor = color.palette.haiti // TODO: if its these folks
      break
    default:
      break
  }

  const pickup = request.pickup
  const drop = request.drop

  if (!pickup || !drop || !pickup.coords || !drop.coords) return null

  // console.tron.display({
  //   name: 'RequestStatusBar',
  //   preview: 'Heres the request',
  //   value: request,
  //   important: true,
  // })

  const requestIsNotActive =
    request.status === ServiceRequestStatus.CANCELLED_BY_RIDER ||
    request.status === ServiceRequestStatus.RESOLVED_BY_RIDER

  const imTheRider = request.playerRequesting.id === userId
  const imTheDriver = request.playerClaiming?.id === userId

  let componentToRender

  if (requestIsNotActive) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text text={`${statusText}`} preset='bold' />
      </View>
    )
  } else if (!requestIsNotActive && imTheDriver) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Button
            preset='small'
            tx='service.navigateToPickup'
            onPress={navigateToPickup}
            style={{ marginRight: 8 }}
          />
        </View>
      </View>
    )
  } else if (!requestIsNotActive && imTheRider) {
    componentToRender = (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Button
            preset='small'
            tx='service.cancel'
            onPress={cancel}
            style={{ marginRight: 8 }}
          />
          {!!request.playerClaiming && (
            <Button preset='small' tx='service.resolve' onPress={resolve} />
          )}
        </View>
      </View>
    )
  }

  return (
    <View
      key={`${request.id}-${authStore?.locale}`}
      style={{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor,
        borderTopColor: color.palette.minsk,
        borderTopWidth: 1,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      {componentToRender}
    </View>
  )
})
