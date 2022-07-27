import { delay } from 'lib/delay'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import {
    ActivityIndicator, Linking, RefreshControl, useWindowDimensions, View
} from 'react-native'
import { useStores } from 'stores'
import { Loading } from 'views/loading'
import { Button, Screen, Text } from 'views/shared'
import { SvgIcon } from 'views/shared/svg-icon'
import { spacing } from 'views/theme'
import { PaymentDetail } from 'views/wallet/components/payment-detail'
import { WalletDock } from 'views/wallet/components/wallet-dock'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

// import { Balances, Transactions, WalletDock } from 'views/wallet'

export const Wallet = observer(() => {
  const { width, height } = useWindowDimensions()
  const { walletStore } = useStores()

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await walletStore.getBalance()
    setRefreshing(false)
    // delay(2000).then(() => setRefreshing(false))
  }, [])

  const { setOptions } = useNavigation()
  useEffect(() => {
    setOptions({ title: 'Wallet' })
  }, [])

  const walletIsLoaded = walletStore.wallet?.id

  useEffect(() => {
    if (!walletIsLoaded) {
      walletStore.loadWallet()
    } else {
      walletStore.getBalance()
    }
  }, [walletIsLoaded])

  const balance = walletStore.balance ? Math.floor(walletStore.balance) : '-'
  const payments = walletStore.payments

  if (!walletIsLoaded) {
    return <Loading message='Loading wallet' />
  }

  return (
    <Screen
      preset='scrollStack'
      style={{
        padding: spacing[4],
        alignItems: 'center',
      }}
      dock={
        <View style={{ padding: spacing[4] }}>
          <WalletDock />
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {refreshing && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -50,
          }}
        >
          <ActivityIndicator style={{ marginRight: 10 }} />
          <Text text='Refreshing' preset='descriptionSlim' />
        </View>
      )}

      <Text preset='header' style={{ margin: spacing[4] }}>
        Bitcoin Balance
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: spacing[4],
          marginBottom: spacing[2],
          // paddingTop: 25,
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            marginRight: 5,
            marginTop: 3,
          }}
        >
          <SvgIcon />
        </View>
        <Text
          preset='title'
          style={{
            textAlign: 'center',
            marginTop: 0,
            fontSize: 40,
            lineHeight: 44,
          }}
        >
          {balance} sats
        </Text>
      </View>

      <Text preset='header' style={{ margin: spacing[4] }}>
        Transactions
      </Text>

      <View style={{ minHeight: height, width: width }}>
        {payments && payments.length > 0 && (
          <FlashList
            data={payments}
            renderItem={({ item }: any) => <PaymentDetail payment={item} />}
            estimatedItemSize={100}
          />
        )}
      </View>
    </Screen>
  )
})
