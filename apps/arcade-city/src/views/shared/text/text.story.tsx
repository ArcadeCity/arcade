import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Text } from './text'
import { message } from 'storybook/demo-data'

storiesOf('Text', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Default', () => (
    <Story>
      <UseCase text='Text' usage='default preset'>
        <Text text={message.text} />
      </UseCase>
      <UseCase text='Text' usage='header preset'>
        <Text text={message.text} preset='header' />
      </UseCase>
      <UseCase text='Text' usage='label preset'>
        <Text text={message.text} preset='label' />
      </UseCase>
      <UseCase text='Text' usage='labelAccept preset'>
        <Text text={message.text} preset='labelAccept' />
      </UseCase>
      <UseCase text='Text' usage='labelCancel preset'>
        <Text text={message.text} preset='labelCancel' />
      </UseCase>
      <UseCase text='Text' usage='link preset'>
        <Text text={message.text} preset='link' />
      </UseCase>
      <UseCase text='Text' usage='secondaryLabel preset'>
        <Text text={message.text} preset='secondaryLabel' />
      </UseCase>
      <UseCase text='Text' usage='sectionHeader preset'>
        <Text text={message.text} preset='sectionHeader' />
      </UseCase>
      <UseCase text='Text' usage='small preset'>
        <Text text={message.text} preset='small' />
      </UseCase>
      <UseCase text='Text' usage='superBold preset'>
        <Text text={message.text} preset='superBold' />
      </UseCase>
      <UseCase text='Text' usage='title preset'>
        <Text text={message.text} preset='title' />
      </UseCase>
      <UseCase text='Text' usage='title2 preset'>
        <Text text={message.text} preset='title2' />
      </UseCase>
      <UseCase text='Text' usage='title3 preset'>
        <Text text={message.text} preset='title3' />
      </UseCase>
      <UseCase text='Text' usage='tx value prop'>
        <Text tx={'welcomeScreen.readyForLaunch'} />
      </UseCase>
    </Story>
  ), {
    notes: 'Text processes content and renders a ReactNativeText component. Data is passed in as props: text of type string, tx of type translation key, txOptions type of i18n.TranslationOptions, preset of type TextPresetNames and capitalize of type boolean'
  })
