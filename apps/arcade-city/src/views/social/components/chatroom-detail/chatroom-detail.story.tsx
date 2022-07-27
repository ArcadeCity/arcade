import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { ChatroomDetail } from './chatroom-detail'
import { RootStoreProvider } from 'stores'
import { RootStore, RootStoreModel } from 'stores/root-store'
import { chatroom } from 'storybook/demo-data'

const store = {
  authStore: {
    id: 1,
  },
}

const rootStore = RootStoreModel.create(store) as RootStore

storiesOf('Social - ChatroomDetail', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Chatroom types', () => (
    <Story>
      <UseCase text='Chatroom' usage='' noPad>
        <ChatroomDetail chatroom={chatroom} />
      </UseCase>
    </Story>
  ), {
    notes: 'ChatroomDetail renders a TouchableOpacity containing information about the chatroom with onPress navigating to the specific chatroom. Data is passed in as props: chatroom of type Chatroom.'
  })
