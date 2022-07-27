// Show the activeRequest in a modal, eventually with action buttons.

import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from 'stores'
import { RequestDetailSimple } from '../../components'
import { REQUEST_VIEW_CONTAINER, REQUEST_VIEW_OVERLAY } from '../../styles'

export const RequestView: React.FC<{}> = observer(() => {
  // State
  const { modalStore, serviceStore } = useStores()
  const activeRequest = serviceStore.activeRequest
  if (!activeRequest) return null

  return (
    <TouchableWithoutFeedback
      style={REQUEST_VIEW_CONTAINER}
      onPress={() => modalStore.closeModal()}
    >
      <View
        style={{ flex: 1, justifyContent: 'center', ...REQUEST_VIEW_CONTAINER }}
      >
        <View style={REQUEST_VIEW_OVERLAY} />
        <RequestDetailSimple request={activeRequest} />
      </View>
    </TouchableWithoutFeedback>
  )
})
