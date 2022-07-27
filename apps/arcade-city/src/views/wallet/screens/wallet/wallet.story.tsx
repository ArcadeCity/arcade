import React from 'react'
import { storiesOf } from '@storybook/react-native'
import {
  RootStore,
  RootStoreModel,
  RootStoreProvider,
  RootStoreSnapshot,
} from 'stores'
import { Wallet } from '../wallet'
import { Transaction } from 'stores/wallet-store'
import { balances } from 'views/wallet/components/balances/balances.story'

const tx: Transaction = {
  id: 1,
  amount: 0.05,
  description: 'Dummy tx',
  type: 'test',
  timestamp: new Date(),
}

const tx2: Transaction = {
  id: 2,
  amount: 18.0135,
  description: 'Dummy tx 2',
  type: 'test',
  timestamp: new Date(),
}

const store = {
  walletStore: {
    balances: balances,
    transactions: { 1: tx, 2: tx2 },
  },
}

const rootStore = RootStoreModel.create(store) as RootStore

storiesOf('Wallet - Wallet screen', module)
  .addDecorator((fn) => (
    <RootStoreProvider value={rootStore}>{fn()}</RootStoreProvider>
  ))
  .add('Standalone', () => <Wallet />, {
    notes: 'Wallet renders a Screen containing the user Balances and Transactions. Data is received from walletStore rather than props.'
  })
