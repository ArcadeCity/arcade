import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  driver2,
  requestCancelledByRider,
  requestClaimed,
  requestResolvedByRider,
  requestUnclaimed,
  requestUnconfirmed,
  rider1,
  rootStore,
} from 'storybook/demo-data'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { RequestDetailSimple } from '../request-detail-simple'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnconfirmed)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setRequest(requestClaimed)
rootStore.serviceStore.setRequest(requestCancelledByRider)
rootStore.serviceStore.setRequest(requestResolvedByRider)

storiesOf('Service - RequestDetailSimple', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='Ride request - unclaimed' usage='' noPad>
        <RequestDetailSimple request={requestUnclaimed} />
      </UseCase>
      <UseCase text='Ride request - claimed' usage='' noPad>
        <RequestDetailSimple request={requestClaimed} />
      </UseCase>
      <UseCase text='Ride request - resolved by rider' usage='' noPad>
        <RequestDetailSimple request={requestResolvedByRider} />
      </UseCase>
      <UseCase text='Ride request - cancelled by rider' usage='' noPad>
        <RequestDetailSimple request={requestCancelledByRider} />
      </UseCase>
    </Story>
  ), {
    notes: 'RequestDetailSimple renders a TouchableOpacity displaying information on the requested service and service requester. On press will navigate to the request chat screen for the service request. Data is provided by the authStore and serviceStore rather than props.'
  })
