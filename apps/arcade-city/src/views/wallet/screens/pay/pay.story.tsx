import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { RootStore, RootStoreModel, RootStoreProvider } from 'stores'
import { Pay } from '../pay'

const rootStore = RootStoreModel.create({}) as RootStore

storiesOf('Wallet - Pay screen', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .add('Standalone', () => <Pay />, {
    notes: 'Pay renders a Screen interface to pay a user including TextField for username and TextField for description and a Button to pay. Data is received from the walletStore rather than props.'
  })
