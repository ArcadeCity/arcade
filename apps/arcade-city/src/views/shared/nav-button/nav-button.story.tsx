import * as React from 'react'
import { Alert } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { NavButton } from './nav-button'
import { RootStoreProvider } from 'stores'
import { rootStore } from 'storybook/demo-data'

storiesOf('NavButton', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='NavButton' usage='preset: back'>
        <NavButton
          text='Example'
          onPress={() => Alert.alert('this is an example on press function')}  
        />
      </UseCase>
      <UseCase text='NavButton' usage='preset: close'>
        <NavButton
          preset='close'
          text='Example'
          onPress={() => Alert.alert('this is an example on press function')}  
        />
      </UseCase>
      <UseCase text='NavButton' usage='preset: forward'>
        <NavButton
          preset='forward'
          text='Example'
          onPress={() => Alert.alert('this is an example on press function')}  
        />
      </UseCase>
    </Story>
  ), {
    notes: 'NavButton renders a TouchableOpacity containing an icon for back, close, or forward, depending on the preset. Also accepts text or tx to render Text and onPress function. Styling can be overwritten with the style prop.'
  })
