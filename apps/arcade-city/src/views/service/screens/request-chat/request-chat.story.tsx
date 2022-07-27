import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  chatroom,
  player1,
  requestUnclaimed,
  rootStore,
} from 'storybook/demo-data'
import { StoryScreen } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { DADALAB } from 'stores/service-store/dummy-data'
import { RequestChat } from '../request-chat'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { ModalName } from 'stores/modal-store'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.chatStore.setChatroom(chatroom)
rootStore.modalStore.openModal(ModalName.REQUEST_BEGIN, { serviceType: 'ride' })
rootStore.playerStore.setPlayer(player1)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setActiveRequest(requestUnclaimed.id)

// @TODO configure RequestChat for storybook - see note in src/lib/hooks/usePlayerResolver.ts
storiesOf('Service - RequestChat', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => <RequestChat />, {
    notes: 'RequestChat renders a Screen where user can interact with the service requester or provider. Data is provided by the serviceStore rather than props.'
  })
