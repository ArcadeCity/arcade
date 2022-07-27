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
import { RequestView } from '../request-view'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { ModalName } from 'stores/modal-store'

rootStore.authStore.setLocation({ coords: DADALAB })
rootStore.chatStore.setChatroom(chatroom)
rootStore.modalStore.openModal(ModalName.REQUEST_BEGIN, { serviceType: 'ride' })
rootStore.playerStore.setPlayer(player1)
rootStore.serviceStore.setRequest(requestUnclaimed)
rootStore.serviceStore.setActiveRequest(requestUnclaimed.id)

storiesOf('Service - RequestView', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Standalone', () => <RequestView />)
