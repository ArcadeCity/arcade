import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  authedPlayer,
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
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { RequestStatusBar } from './request-status-bar'

rootStore.authStore.setAuthedPlayer(authedPlayer)
rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnconfirmed)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setRequest(requestClaimed)
rootStore.serviceStore.setRequest(requestCancelledByRider)
rootStore.serviceStore.setRequest(requestResolvedByRider)

storiesOf('Service - RequestStatusBar', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='Ride request - unclaimed' usage='' noPad>
        <RequestStatusBar request={requestUnclaimed} />
      </UseCase>
      <UseCase text='Ride request - claimed' usage='' noPad>
        <RequestStatusBar request={requestClaimed} />
      </UseCase>
      <UseCase text='Ride request - resolved by rider' usage='' noPad>
        <RequestStatusBar request={requestResolvedByRider} />
      </UseCase>
      <UseCase text='Ride request - cancelled by rider' usage='' noPad>
        <RequestStatusBar request={requestCancelledByRider} />
      </UseCase>
    </Story>
  ),{
    notes: 'RequestStatusBar renders a View depending on the status of request - unclaimed, claimed, resolved by rider or cancelled by driver. Data is provided by the authStore and serviceStore rather than props.'
  })
