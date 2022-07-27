import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { messageModel as message, rootStore } from 'storybook/demo-data'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { Message } from '../message'

storiesOf('Social - Message', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Presets received & sent', () => (
    <Story>
      <UseCase text='Message Received' usage='' noPad>
        <Message preset='received' message={message} />
      </UseCase>
      <UseCase text='Message Sent' usage='' noPad>
        <Message preset='sent' message={message} />
      </UseCase>
    </Story>
  ), {
    notes: 'Message renders a View displaying the message contents, sender avatar, and delivery time. Data is passed in as props: message of type Message and preset of type "sent" or "received"'
  })
