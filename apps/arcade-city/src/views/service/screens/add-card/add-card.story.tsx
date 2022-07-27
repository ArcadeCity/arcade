import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { AddCard } from './add-card'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { RootStoreProvider } from 'stores'
import { rootStore } from 'storybook/demo-data'

storiesOf('Service - AddCard', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='AddCard' usage='' noPad>
        <AddCard />
      </UseCase>
    </Story>
  ), {
    notes: 'AddCard renders a screen containing a FlipCard component and a TextField where user can create a new card. Data is provided by the service store rather than props.'
  })
