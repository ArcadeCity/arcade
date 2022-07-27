import * as React from 'react'
import { Alert } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { MenuButton } from './menu-button'
import { RootStoreProvider } from 'stores'
import { rootStore } from 'storybook/demo-data'
import { images } from 'views/theme'

storiesOf('MenuButton', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='MenuButton' usage='Default'>
        <MenuButton
          image={images.charter}
          title='Example'
          description='click here to go to example screen'
          onPress={() => Alert.alert('this is an example on press function')}  
        />
      </UseCase>
    </Story>
  ), {
    notes: 'MenuButton renders a View including an Image, title and description. Data is passed in as props: image of type ImageUriSource, title of type string, description of type string, and onPress of type function. Rendering the last button of a list can be passed the prop: last of type boolean. Rather than pass strings in for title and description translation keys can also be provided as titleTx and descriptionTx'
  })
