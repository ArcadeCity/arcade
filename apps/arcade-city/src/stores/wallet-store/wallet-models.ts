import { Instance, types } from 'mobx-state-tree'

export const LightningWalletModel = types
  .model('LightningWallet')
  .props({
    accessToken: types.optional(types.string, ''),
    balance: types.optional(types.number, 0),
    balanceUnconfirmed: types.optional(types.number, 0),
    baseUri: types.optional(types.string, ''),
    chain: types.optional(types.string, ''),
    createdAt: types.Date,
    label: types.optional(types.string, ''),
    pendingTransactionsRaw: types.optional(types.frozen(), {}),
    refreshToken: types.optional(types.string, ''),
    secret: types.optional(types.string, ''),
    userHasSavedExport: types.optional(types.boolean, false),
    userInvoicesRaw: types.optional(types.frozen(), {}),
  })
  .views(() => ({
    isNew() {
      return true // createdAt within last...(?)
    },
  }))

export const BalanceModel = types.model('Balance').props({
  balance: types.optional(types.number, 0),
  price: types.optional(types.number, 0),
  fetched: types.optional(types.boolean, false),
  symbol: types.optional(types.string, ''),
})

export const BalancesModel = types.model('Balances').props({
  ARCD: types.optional(BalanceModel, {}),
  BTC: types.optional(BalanceModel, {}),
  sats: types.optional(BalanceModel, {}),
  USDC: types.optional(BalanceModel, {}),
})

export const TransactionModel = types.model('Transaction').props({
  id: types.identifierNumber,
  amount: types.number,
  description: types.string,
  timestamp: types.Date,
  type: types.string,
})

export interface Balance extends Instance<typeof BalanceModel> {}
export interface Balances extends Instance<typeof BalancesModel> {}
export interface Transaction extends Instance<typeof TransactionModel> {}
export interface LightningWallet
  extends Instance<typeof LightningWalletModel> {}
