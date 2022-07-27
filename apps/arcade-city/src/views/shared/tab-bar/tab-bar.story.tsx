import * as React from 'react'
import { Animated } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { TabBar } from './tab-bar'

const state = {
    routes: [
      { name: 'map' },
      { name: 'service' },
      { name: 'inbox', routeName: 'inbox' },
      { name: 'guild' },
      { name: 'menu' },
    ],
  }

const props = {
  activeTintColor: 'white',
  inactiveTintColor: 'white',
  position: new Animated.Value(0),
  navigation: {},
  state
}

// @TODO define props of TabBar and Tab components and document story
storiesOf('TabBar', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behaviour', () => (
    <Story>
      <UseCase text='The TabBar' usage='The main tab bar in the app.' noPad>
        <TabBar {...props} />
      </UseCase>
    </Story>
  ))
