import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { RootStoreProvider } from 'stores'
import { Profile } from './profile'
import { rootStore, driver2 } from 'storybook/demo-data'

rootStore.playerStore.setSelectedPlayer(driver2.id)

// @TODO configure profile to work with storybook - username in params must match selected player in player store
storiesOf('Profile', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='Profile' usage='' noPad>
        <Profile />
      </UseCase>
    </Story>
  ), {
    notes: 'Profile renders a Screen displaying the ProfileSummary as well as the option to open a chat with the user or edit profile if user is viewing their own profile. Will display loading screen if unable to load selected player. Data is provided by playerStore rather than props.'
  })
