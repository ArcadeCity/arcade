import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { useStores } from 'stores'
import { ServiceRequestStatus } from 'stores/service-store'
import { Button, Icon, Text } from 'views/shared'
import { spacing } from 'views/theme'
import * as s from './style'
import { translate } from 'i18n'
import { capitalize } from 'lodash'

export const RequestOverlay = observer(() => {
  // State
  const { authStore, serviceStore } = useStores()
  const { goBack, navigate } = useNavigation<any>()

  // How many chat messages are in this request? If > 0, navigate once to
  const messageCount =
    serviceStore.activeRequest?.chatroom?.driverMessages.length
  const messagesYes = messageCount && messageCount > 0
  // useEffect(() => {
  //     if (messagesYes && messageCount === 1) {
  //         console.log('navving there')
  //         navigate('service', { screen: 'requestChat' })
  //     }
  // }, [messageCount])

  // UI
  const [show, setShow] = useState(false)
  const explain = () => Alert.alert(translate('service.requestExplainer'))
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

  // Animation
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const toggleOpacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    setShow(true)
  }, [])
  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
    Animated.timing(toggleOpacity, {
      toValue: show ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [show])

  const yesAnd =
    serviceStore.activeRequest?.status === ServiceRequestStatus.CLAIMED

  return show ? (
    <Animated.View
      key={`show-${authStore?.locale}`}
      style={{
        ...s.DRIVEROVERLAY,
        opacity: overlayOpacity,
      }}
    >
      {messagesYes ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            preset='title2'
            tx={
              yesAnd ? 'service.driverSelected' : 'service.driversHaveResponded'
            }
          />
          <Text
            preset='descriptionSlim'
            tx={
              yesAnd
                ? 'service.chatWithYourDriver'
                : 'service.goSelectYourDriver'
            }
          />
          <Button
            tx='service.goToRequestChat'
            style={{
              marginTop: spacing[3],
              marginBottom: spacing[5],
              // width: 200,
            }}
            onPress={() => navigate('service', { screen: 'requestChat' })}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity style={s.SPINNER} onPress={explain}>
            <ActivityIndicator />
          </TouchableOpacity>
          <Text
            preset='title3'
            tx='service.waitingForDriver'
            style={{ marginBottom: 18 }}
          />
        </View>
      )}

      <TouchableOpacity style={s.CLOSEBTN} onPress={explain}>
        <Icon name='support' />
      </TouchableOpacity>
      {!messagesYes && (
        <Button
          tx='service.cancel'
          onPress={cancel}
          style={{ marginTop: 0, marginBottom: 6 }}
          preset='small'
        />
      )}
    </Animated.View>
  ) : (
    <Animated.View
      key={`none-${authStore?.locale}`}
      style={{ ...s.OPENBTN, opacity: toggleOpacity }}
    >
      <Button
        text={capitalize(translate('common.open'))}
        preset='purpleglow'
        // icon
        onPress={() => setShow(true)}
      >
        <Icon name='rider' />
      </Button>
    </Animated.View>
  )
})
