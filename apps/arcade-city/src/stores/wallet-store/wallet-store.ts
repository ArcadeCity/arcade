import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { Alert } from 'react-native'
import { withEnvironment, withRootStore } from 'stores/_extensions'
import { PayProps } from 'views/wallet'
import * as actions from './wallet-actions'

export const WalletStoreModel = types
  .model('WalletStore')
  .props({
    balance: types.maybe(types.number),
    payments: types.optional(types.frozen(), {}),
    wallet: types.optional(types.frozen(), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    init: async (): Promise<boolean> => await actions.init(self as WalletStore),
    getBalance: async (): Promise<boolean> =>
      await actions.getBalance(self as WalletStore),
    loadWallet: async (): Promise<boolean> =>
      await actions.loadWallet(self as WalletStore),
    pay: async (props: PayProps): Promise<boolean> =>
      await actions.pay(self as WalletStore, props),
    sendTest: async (): Promise<boolean> =>
      await actions.sendTest(self as WalletStore),
    setBalance(balance: any) {
      self.balance = balance
    },
    setPayments(payments: any) {
      self.payments = payments
    },
    setWallet(wallet: any) {
      self.wallet = wallet
    },
    // reset() {
    //   self.transactions.clear()
    // },
  }))
  .views((self) => ({
    get lnbitsUrl(): any {
      return `https://2342c8b04a.d.voltageapp.io/wallet?usr=${self.wallet.lnbits_user_id}&wal=${self.wallet.wallet_id}`
    },
  }))

type WalletStoreType = Instance<typeof WalletStoreModel>
export interface WalletStore extends WalletStoreType {}
type WalletStoreSnapshotType = SnapshotOut<typeof WalletStoreModel>
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
export const createWalletStoreDefaultModel = () =>
  types.optional(WalletStoreModel, {})
