import { Meta } from '@storybook/react'
import { Text } from './text'

export default {
  component: Text,
  title: 'Atoms/Text',
} as Meta

export const Basic: React.FC<{}> = () => <Text text='Hello world' />

export const descriptionSlim: React.FC<{}> = () => (
  <Text text='Hello world' preset='descriptionSlim' />
)
