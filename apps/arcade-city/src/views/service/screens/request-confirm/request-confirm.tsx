import React from 'react'
import { View } from 'react-native'
import { AllRequestDetails, RequestMap } from '../../components'
import { REQUEST_CONFIRM_CONTAINER } from '../../styles'

export const RequestConfirm: React.FC<{}> = () => (
  <View style={REQUEST_CONFIRM_CONTAINER}>
    <RequestMap />
    <AllRequestDetails />
  </View>
)
