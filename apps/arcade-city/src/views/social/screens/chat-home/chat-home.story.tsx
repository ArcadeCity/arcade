import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { ChatHome } from './chat-home'
import { rootStore, chatroom } from 'storybook/demo-data'

rootStore.chatStore.setChatroom(chatroom)

// @TODO configure ChatHome for storybook - see note in src/lib/hooks/usePlayerResolver.ts
storiesOf('ChatHome', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='ChatHome' usage='' noPad>
        <ChatHome />
      </UseCase>
    </Story>
  ), {
    notes: 'ChatHome renders a Screen with a list of chatrooms. Clicking a chatroom will navigate to the specific chatroom. Will display loading screen if unable to load players. Data is provided by chatStore rather than props.'
  })
