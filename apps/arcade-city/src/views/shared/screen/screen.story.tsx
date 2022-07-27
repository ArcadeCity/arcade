import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen } from 'storybook/views'
import { Screen } from './screen'

storiesOf('Screen', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => <Screen preset='scrollInner' />, {
    notes: 'Screen renders a ChatRoomScreen, ScreenWithoutScrolling, or ScreenWithScrolling depending on the preset provided: nonScroll, scrollInner or scrollOuter. Data is passed in as props: preset of type string, dock of type ReactNode, dockHeight of type number, transparent of type boolean.'
  })
