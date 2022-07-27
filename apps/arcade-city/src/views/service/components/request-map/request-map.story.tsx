import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, } from 'storybook/views'
import { RequestMap } from './request-map'
import { RootStoreProvider } from 'stores'
import { rootStore } from 'storybook/demo-data'

storiesOf('Map - RequestMap', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => <RequestMap />, {
    notes: 'RequestMap renders a Screen including a Map showing the requested service. Data is received from the serviceStore rather than props.'
  })
