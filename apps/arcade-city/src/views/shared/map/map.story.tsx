import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen } from 'storybook/views'
import { Map } from './map'

storiesOf('Map', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => <Map />, {
    notes: 'Map renders an Animated View containing the Arcade City background. No props are accepted. '
  })
