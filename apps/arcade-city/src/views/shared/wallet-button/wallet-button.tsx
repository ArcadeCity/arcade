import React from 'react'
import { Alert, Linking } from 'react-native'
import { useStores } from 'stores'
import { useRoute } from '@react-navigation/native'
import { Button } from '../button'
import { Icon } from '../icon'

export const WalletButton = () => {
  const { walletStore } = useStores()
  const route = useRoute()
  if (route.name !== 'wallethome') return null
  return (
    <Button
      preset='small'
      icon
      onPress={() =>
        Alert.alert(
          'Open in LNbits',
          'This will open your Lightning wallet in the LNbits web interface, where you can pay or create invoices directly.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => Linking.openURL(walletStore.lnbitsUrl),
            },
          ]
        )
      }
    >
      <Icon fontAwesome='bank' />
    </Button>
  )
}
