import React from 'react'
import { Story, StoryScreen, UseCase } from 'storybook/views'
import { storiesOf } from '@storybook/react-native'
import { WalletDock } from '../wallet-dock'

storiesOf('Wallet - WalletDock', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add(
    'In UseCase',
    () => (
      <Story>
        <UseCase text='WalletDock' usage='' noPad>
          <WalletDock />
        </UseCase>
      </Story>
    ),
    {
      notes:
        'WalletDock renders a View containing three buttons: Request, Pay, and Trade. No props are accepted.',
    }
  )
