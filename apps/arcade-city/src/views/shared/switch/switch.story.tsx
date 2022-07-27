import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Switch } from './switch'

storiesOf('Switch', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => (
    <Story>
      <UseCase text='Switch' usage='value=false'>
        <Switch value={false} onToggle={() => true} />
      </UseCase>
      <UseCase text='Switch' usage='value=true'>
        <Switch value={true} onToggle={() => true} />
      </UseCase>
    </Story>
  ), {
    notes: 'Switch renders a toggle component. State (true or false) and onToggle are handled by the parent component and passed down as props: value of type boolean, onToggle of type function, and style of type ViewStyle. Additional styling to the track and thumb can be added with trackOnStyle, trackOffStyle, thumbOnStyle, and thumbOffStyle.'
  })
