import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  driver2,
  requestUnclaimed,
  rider1,
  rootStore,
} from 'storybook/demo-data'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { RequestOverlay } from '../request-overlay'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setActiveRequest(requestUnclaimed.id)

storiesOf('Service - RequestOverlay', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => <RequestOverlay />, {
    notes: 'RequestOverlay renders a View with information relavant to the service request. Data is provided by the serviceStore rather than'
  })
