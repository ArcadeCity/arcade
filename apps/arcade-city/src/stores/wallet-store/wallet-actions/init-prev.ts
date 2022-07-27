// import { Alert } from 'react-native'
// import { delay } from 'lib/delay'
import { WalletStore } from '../wallet-store'

export const init = async (self: WalletStore) => {
  return false
  // const solana = self.env.solana
  // const solAddress = self.rootStore.authStore.player.solAddress
  // if (!solAddress) {
  //   Alert.alert('Trying to init wallet without solAddress')
  // }
  // await solana.setup()
  // solana.setPublicKey(solAddress)

  // await delay(500)
  // const accounts = await solana.getTokenAccounts()
  // self.setTokenAccounts(accounts)
  // // const history = await solana.getTransactionHistory()
  // // self.setTransactions(history)
  // return true
}
