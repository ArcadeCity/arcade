import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { ProfileEdit } from './profile-edit'
import { rootStore, driver2 } from 'storybook/demo-data'

rootStore.playerStore.setSelectedPlayer(driver2.id)

// @TODO configure profile to work with storybook - username in params must match selected player in player store
storiesOf('ProfileEdit', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='ProfileEdit' usage='' noPad>
        <ProfileEdit />
      </UseCase>
    </Story>
  ), {
    notes: 'ProfileEdit renders a Screen displaying the options to change username, change bio, and change profession. Each button navigates to the respective page. Data is provided by authStore rather than props.'
  })
