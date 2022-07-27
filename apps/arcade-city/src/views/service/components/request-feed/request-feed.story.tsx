import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  driver2,
  requestCancelledByRider,
  requestClaimed,
  requestResolvedByRider,
  requestUnclaimed,
  rider1,
  rootStore,
} from 'storybook/demo-data'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { RequestFeed } from '../request-feed'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.playerStore.setPlayer(rider1)
rootStore.playerStore.setPlayer(driver2)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setRequest(requestClaimed)
rootStore.serviceStore.setRequest(requestCancelledByRider)
rootStore.serviceStore.setRequest(requestResolvedByRider)

// @TODO configure ChatHome for storybook - see note in src/lib/hooks/usePlayerResolver.ts
storiesOf('Service - RequestFeed', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('In UseCase', () => (
    <Story>
      <UseCase text='Request feed' usage='' noPad>
        <RequestFeed />
      </UseCase>
    </Story>
  ), {
    notes: 'RequestFeed renders a View containing a list of RequestDetail components. Data is provided by the serviceStore rather than props.'
  })
