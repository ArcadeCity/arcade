import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { PlayerDetail } from './player-detail'
import {  player1 } from 'storybook/demo-data'

// @TODO fix translations for en.profile.viewProfile and en.chat.openChat
storiesOf('PlayerDetail', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='PlayerDetail' usage='no buttons' noPad>
        <PlayerDetail
          player={player1}
        />
      </UseCase>
      <UseCase text='PlayerDetail' usage='with buttons' noPad>
        <PlayerDetail
          player={player1}
          withButtons
        />
      </UseCase>
    </Story>
  ), {
    notes: 'PlayerDetail renders a View containing information on a player including avatar, username, level, profession. Can be optionally rendered with buttons linking to profile and open chat. Data is passed in as props: player of type Player and withButtons of type boolean.'
  })
