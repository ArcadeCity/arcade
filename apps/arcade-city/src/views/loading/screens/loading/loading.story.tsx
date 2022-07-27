import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, } from 'storybook/views'
import { Loading } from './loading'
 
storiesOf('Loading', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => <Loading message='Loading' />, {
    notes: 'Loading renders a View with a loading icon when loading. Data is passed in as props: message of type string and style (optional) of type StyleSheet'
  })
