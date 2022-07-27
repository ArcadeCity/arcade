import { useState } from 'react'
import { Text, View } from 'react-native'
import { useStores } from 'stores'
import { ModalName } from 'stores/modal-store'

// create a hud button
export const HudTest = () => {
  const { authStore, modalStore, serviceStore } = useStores()
  const username = authStore.username
  const [show, setShow] = useState(false)
  const openModal = (serviceType: string) => {
    serviceStore.setActiveRequest(undefined)
    modalStore.openModal(ModalName.REQUEST_BEGIN, { serviceType })
  }
  return show ? (
    <View>
      <Text>You did it!</Text>
    </View>
  ) : (
    <View>
      <Text>You did it!</Text>
    </View>
  )
}
