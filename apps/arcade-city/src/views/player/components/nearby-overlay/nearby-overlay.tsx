import { translate } from 'i18n'
import { capitalize } from 'lodash'
import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import {
    Animated, Linking, ScrollView, TouchableOpacity, useWindowDimensions, View
} from 'react-native'
import { useStores } from 'stores'
import { ModalName } from 'stores/modal-store'
import { PlayerDetail } from 'views/hud/PlayerDetail'
import { Button, Icon, Text } from 'views/shared'
import { palette } from 'views/theme'
import { Feather } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import * as s from './style'

let fetched = 0

export const NearbyOverlay = observer(() => {
  const dim = useWindowDimensions()
  // State
  const { authStore, modalStore, playerStore, serviceStore } = useStores()
  const username = authStore.username

  const players = playerStore.nearbyPlayers
  useEffect(() => {
    fetched = fetched + 1
    if (fetched > 3) return
    playerStore.getNearby(authStore.coords.latitude, authStore.coords.longitude)
  }, [authStore.coords.latitude])

  // UI
  const [show, setShow] = useState(false)
  const openModal = (serviceType: string) => {
    serviceStore.setActiveRequest(undefined)
    modalStore.openModal(ModalName.REQUEST_BEGIN, { serviceType })
  }

  // Animation
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const toggleOpacity = useRef(new Animated.Value(0)).current

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

  return show ? (
    <Animated.View
      style={{ ...s.DRIVEROVERLAY, opacity: overlayOpacity }}
      key={authStore?.locale}
    >
      <TouchableOpacity style={s.CLOSEBTN} onPress={() => setShow(false)}>
        <Icon name='close' />
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            minHeight: dim.height,
          }}
        >
          <Text
            preset='title3'
            text='Nearby Players'
            style={{ marginBottom: 10, textAlign: 'center' }}
          />
          {authStore.coords.latitude === 0 &&
            authStore.coords.longitude === 0 && (
              <Text
                text="We don't have your location - showing unsorted"
                preset='description'
                style={{ textAlign: 'center' }}
              />
            )}
          <FlashList
            data={players}
            renderItem={({ item }: any) => <PlayerDetail player={item} />}
            estimatedItemSize={100}
          />
        </View>
      </ScrollView>
    </Animated.View>
  ) : (
    <Animated.View
      style={{ ...s.OPENBTN, opacity: toggleOpacity }}
      key={authStore?.locale}
    >
      <Button preset='purpleglow' icon onPress={() => setShow(true)}>
        <Feather name='users' size={24} color={palette.moonRaker} />
      </Button>
    </Animated.View>
  )
})
