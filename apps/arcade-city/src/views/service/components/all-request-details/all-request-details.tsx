import React, { useState } from 'react'
import {
  Alert,
  ScrollView,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from 'stores'
import { ModalName } from 'stores/modal-store'
import { Button, Icon, Text } from 'views/shared'
import { ALL_REQUEST_DETAILS_CONTAINER, SPACED_ROW } from '../../styles'
import { Coords } from 'stores/service-store'
import { translate } from 'i18n'

export const AllRequestDetails: React.FC<{}> = observer(() => {
  // State
  const [submitted, setSubmitted] = useState(false)
  const { authStore, modalStore, serviceStore } = useStores()
  const activeRequest = serviceStore.activeRequest
  if (!activeRequest) return null

  // UI
  const payingWithIcon =
    activeRequest.paymentMethod === 'cash' ? 'dollar' : 'payment'
  const payingWithText =
    activeRequest.paymentMethod === 'cash'
      ? translate('service.cash')
      : `${activeRequest.paymentCard?.network} ${activeRequest.paymentCard?.last4}`
  const pickup = activeRequest.pickup
  const drop = activeRequest.drop
  const details: string | null = activeRequest.details
  const resetAddress = (type: 'pickup' | 'drop') => {
    modalStore.setName(ModalName.REQUEST_BEGIN)
    activeRequest.removeAddressesOfServiceTypeExcept(type, '')
  }

  const clickedSend = () => {
    if (!pickup?.coords?.latitude || !pickup?.coords?.longitude) return
    const coords: Coords = {
      latitude: pickup.coords.latitude,
      longitude: pickup.coords.longitude,
    }
    // Ensure their pickup address isn't more than 30km from current
    // position - longer because delivery and who-knows.
    if (parseFloat(authStore.distance(coords)) > 30) {
      Alert.alert(translate('service.pickupTooFar'))
      return
    }

    setSubmitted(true)
    serviceStore.confirmRequest()
  }

  return (
    <ScrollView
      style={ALL_REQUEST_DETAILS_CONTAINER}
      // contentContainerStyle={{ justifyContent: 'space-between' }}
    >
      <View>
        {/* Pickup address */}
        <TouchableOpacity
          style={{ ...ROW, marginTop: 4 }}
          onPress={() => resetAddress('pickup')}
        >
          <View style={ICON_CONTAINER}>
            <Icon name='mapActive' />
          </View>
          <View style={PADDINGLEFT}>
            <Text preset='sectionHeader' tx='service.pickupAddress' />
            <Text preset='bold' text={pickup?.prettyName} />
          </View>
        </TouchableOpacity>

        {/* Drop address */}
        <TouchableOpacity style={NEWROW} onPress={() => resetAddress('drop')}>
          <View style={{ flexDirection: 'row' }}>
            <View style={ICON_CONTAINER}>
              <Icon name='mapActive' />
            </View>
            <View style={PADDINGLEFT}>
              <Text preset='sectionHeader' tx='service.dropoffAddress' />
              <Text preset='bold' text={drop?.prettyName} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={SPACED_ROW}>
          {/* Sending request to */}
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', ...MARGINTOP }}
            onPress={() =>
              Alert.alert(translate('service.upcomingFeatureRequestDrivers'))
            }
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={ICON_CONTAINER}>
                <Icon name='guildsActive' />
              </View>
              <View style={PADDINGLEFT}>
                <Text preset='sectionHeader' tx='service.sendingRequestTo' />
                <Text preset='bold' tx='service.allLocalDrivers' />
              </View>
            </View>
          </TouchableOpacity>

          {/* When */}
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', ...MARGINTOP }}
            onPress={() =>
              Alert.alert(translate('service.placeholderSchedule'))
            }
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={ICON_CONTAINER}>
                <Icon fontAwesome='calendar' />
              </View>
              <View style={PADDINGLEFT}>
                <Text preset='sectionHeader' tx='service.when' />
                <Text preset='bold' tx='service.now' />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={SPACED_ROW}>
          {/* Fare */}
          <TouchableOpacity
            style={{ flex: 1, flexDirection: 'row', ...MARGINTOP }}
            onPress={() => Alert.alert(translate('service.placeholderFare'))}
          >
            <View style={ICON_CONTAINER}>
              <Icon name='dollar' />
            </View>
            <View style={PADDINGLEFT}>
              <Text preset='sectionHeader' tx='service.fareEstimate' />
              <Text preset='bold' tx='service.negotiable' />
            </View>
          </TouchableOpacity>

          {/* Paying with */}
          <TouchableOpacity
            style={{
              ...NEWROW,
              flex: 1,
            }}
            onPress={() =>
              Alert.alert(
                translate('service.placeholderPayments')
              )
            }
          >
            <View style={{ flexDirection: 'row' }}>
              <View style={ICON_CONTAINER}>
                <Icon name={payingWithIcon} />
              </View>
              <View style={PADDINGLEFT}>
                <Text preset='sectionHeader' tx='service.payingWith' />
                <Text preset='bold' text={payingWithText} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Details */}
        <TouchableOpacity
          style={ROW}
          onPress={() => modalStore.setName(ModalName.ADD_DETAILS)}
        >
          <View style={ICON_CONTAINER}>
            <Icon name='inboxActive' />
          </View>
          <View style={PADDINGLEFT}>
            <Text preset='sectionHeader' tx='service.details' />
            <Text
              preset='bold'
              text={
                details && details.length > 0 ? details : translate('service.detailsTapToAdd')
              }
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button
        tx={submitted ? 'service.sending' : 'service.sendRequestToDrivers'}
        style={{ marginTop: 25, marginBottom: 60 }}
        textStyle={{ fontSize: 18, lineHeight: 24 }}
        onPress={clickedSend}
        // disabled={submitted}
      />
    </ScrollView>
  )
})

const MARGINTOP: ViewStyle = { marginTop: 20 }

const ICON_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 30,
}

const NEWROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  ...MARGINTOP,
}

const ROW: ViewStyle = {
  flexDirection: 'row',
  ...MARGINTOP,
}

const PADDINGLEFT: ViewStyle = {
  paddingLeft: 12,
}
