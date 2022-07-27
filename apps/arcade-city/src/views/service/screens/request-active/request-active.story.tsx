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
import { StoryScreen } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { RequestActive } from '../request-active'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { ModalName } from 'stores/modal-store'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.modalStore.openModal(ModalName.REQUEST_ACTIVE, {
  serviceType: 'ride',
})
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnconfirmed)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setActiveRequest(requestUnclaimed.id)
rootStore.serviceStore.setRequest(requestClaimed)
rootStore.serviceStore.setRequest(requestCancelledByRider)
rootStore.serviceStore.setRequest(requestResolvedByRider)

storiesOf('Service - RequestActive', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => <RequestActive />)
