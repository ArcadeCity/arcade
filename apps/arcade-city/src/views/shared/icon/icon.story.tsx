import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { reactNavigationDecorator } from 'storybook/navigation-decorator'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Icon } from './icon'
import { RootStoreProvider } from 'stores'
import { rootStore } from 'storybook/demo-data'

storiesOf('Icon', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .addDecorator(reactNavigationDecorator)
  .add('Default', () => (
    <Story>
      <UseCase text='Icon name' usage='car'>
        <Icon name='car'/>
      </UseCase>
      <UseCase text='Icon name' usage='map'>
        <Icon name='map'/>
      </UseCase>
      <UseCase text='Icon name' usage='inbox'>
        <Icon name='inbox'/>
      </UseCase>
      <UseCase text='Icon name' usage='dollar'>
        <Icon name='dollar'/>
      </UseCase>
      <UseCase text='Icon name' usage='service'>
        <Icon name='service'/>
      </UseCase>
      <UseCase text='Icon name' usage='guilds'>
        <Icon name='guilds'/>
      </UseCase>
      <UseCase text='Icon name' usage='charter'>
        <Icon name='charter'/>
      </UseCase>
      <UseCase text='Icon name' usage='note'>
        <Icon name='note'/>
      </UseCase>
      <UseCase text='Icon name' usage='refer'>
        <Icon name='refer'/>
      </UseCase>
      <UseCase text='Icon name' usage='logout'>
        <Icon name='logout'/>
      </UseCase>
      <UseCase text='Icon name' usage='support'>
        <Icon name='support'/>
      </UseCase>
      <UseCase text='FontAwesome' usage='music'>
        <Icon fontAwesome={'music'} />
      </UseCase>
      <UseCase text='FontAwesome' usage='paperclip'>
        <Icon fontAwesome={'paperclip'} />
      </UseCase>
      <UseCase text='FontAwesome' usage='circle'>
        <Icon fontAwesome={'circle'} />
      </UseCase>
    </Story>
  ), {
    notes: 'Icon renders a View of an Image based on the name prop provided. FontAwesome icons can also be rendered by pasing in the fontAwesome prop. Lastly, accepts an optional style prop to apply additional styling.'
  })
