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
import { ServiceHome } from '../service-home'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnconfirmed)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setRequest(requestClaimed)
rootStore.serviceStore.setRequest(requestCancelledByRider)
rootStore.serviceStore.setRequest(requestResolvedByRider)

// @TODO configure ServiceHome for storybook - see note in src/lib/hooks/usePlayerResolver.ts
storiesOf('Service - ServiceHome', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => <ServiceHome />, {
    notes: 'ServiceHome renders a Screen containing a RequestFeed component. Data is provided by serviceStore rather than props.'
  })
