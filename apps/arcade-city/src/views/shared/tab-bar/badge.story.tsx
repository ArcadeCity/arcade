import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Badge } from './badge'

storiesOf('Badge', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Behaviour', () => (
    <Story>
      <UseCase
        text='The Badge'
        usage='Use the badge to display notification counts.'
        style={{ alignItems: 'center' }}
      >
        <Badge count={2} />
      </UseCase>
      <UseCase
        text='Zero count'
        usage='Hides when the count is zero.'
        style={{ alignItems: 'center' }}
      >
        <Badge count={0} />
      </UseCase>
      <UseCase
        text='Large count'
        usage='Supports large counts.'
        style={{ alignItems: 'center' }}
      >
        <Badge count={222} />
      </UseCase>
    </Story>
  ))
  .add('Styling', () => (
    <Story>
      <UseCase
        text='Custom Styling'
        usage="Promise me this won't happen."
        style={{ alignItems: 'center' }}
      >
        <Badge
          count={10}
          style={{
            backgroundColor: 'red',
            borderWidth: 3,
            borderColor: 'green',
          }}
        />
      </UseCase>
    </Story>
  ))
