import * as React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import {
  driver2,
  requestUnconfirmed,
  rider1,
  rootStore,
} from 'storybook/demo-data'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { REQUEST_CONFIRM_CONTAINER } from 'views/service/styles'
import { AllRequestDetails } from './all-request-details'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnconfirmed)
rootStore.serviceStore.setActiveRequest(requestUnconfirmed.id)

storiesOf('Service - AllRequestDetails', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => (
    <View style={REQUEST_CONFIRM_CONTAINER}>
      <AllRequestDetails />
    </View>
  ), {
    notes: 'AllRequestDetails renders a ScrollView containing all configurable options for the service request. Data is provided by the authStore and serviceStore rather than props.'
  })
