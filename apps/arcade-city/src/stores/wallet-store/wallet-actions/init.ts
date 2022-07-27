import { display, log } from 'lib'
import { WalletStore } from '../wallet-store'

export const init = async (self: WalletStore) => {
  // temp
  // self.env.ceramic.authenticate(null)
  // return false

  // const wallet = checkForWallet() ?? (await self.env.lightning.createWallet())

  // if (!!wallet && wallet.isNew) {
  //   await self.env.ceramic.authenticate(null)
  //   await self.env.ceramic.saveWallet(wallet)
  // }

  // display({
  //   name: 'walletStore init',
  //   preview: 'Wallet object:',
  //   value: wallet,
  // })
  return true
}

// Check storage and Ceramic for wallet.
const checkForWallet = () => {
  return null
}
