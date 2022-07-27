import { Alert } from 'react-native'
import { WalletApi } from 'services/api'
import { Player } from 'stores/player-store'
import { PayProps } from 'views/wallet'
import { WalletStore } from '../wallet-store'

export const pay = async (self: WalletStore, props: PayProps) => {
  const walletApi = new WalletApi(self.env.api)

  // ensure this username is known
  const recipient = (await self.rootStore.playerStore.getPlayerByUsername(
    props.username
  )) as Player

  if (!recipient || !recipient.id) {
    Alert.alert('Could not find a player with that username')
    return false
  }

  const result: any = await walletApi.pay({ ...props, user_id: recipient.id })
  console.log(result)
  if (result && result.checking_id.length > 3) {
    return true
  } else {
    return false
  }
}
