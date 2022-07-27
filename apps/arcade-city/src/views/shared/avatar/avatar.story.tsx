import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Avatar } from './avatar'
import { player1 } from 'storybook/demo-data'

storiesOf('Avatar', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => (
    <Story>
      <UseCase text='With Profile Picture' usage='display user profile picture when exists'>
        <Avatar uri={player1.profilePicture} />
      </UseCase>
      <UseCase text='No Profile Picture' usage='display default avatar when no profile picture exists'>
        <Avatar />
      </UseCase>
    </Story>
  ), {
    notes: 'Avatar renders a View of an Image representing the user profile picture. If no image, diplays the default profile image. Data is passed in as props: uri of type string, guild of type boolean, forOnPress of type function, and style of type style object.'
  })
