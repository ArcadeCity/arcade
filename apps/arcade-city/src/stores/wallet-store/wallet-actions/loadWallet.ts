import { AuthApi } from 'services/api/auth-api'
import { WalletStore } from '../wallet-store'

export const loadWallet = async (self: WalletStore) => {
  console.log('Load wallet!')

  const authApi = new AuthApi(self.env.api)
  const result: any = await authApi.fetchMe()
  console.log(result.wallet)

  self.setWallet(result.wallet)

  return false
}
