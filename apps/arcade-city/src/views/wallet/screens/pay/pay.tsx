import { observer } from 'mobx-react-lite'
import { goBack } from 'navigation/navigation-utilities'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { useStores } from 'stores'
import { Button, Screen, Text, TextField } from 'views/shared'
import { spacing } from 'views/theme'
import { useNavigation } from '@react-navigation/native'

export interface PayProps {
  username: string
  memo: string
  amount: number
}

export const Pay = observer(({ route }: any) => {
  const { walletStore } = useStores()
  // Form
  const { register, handleSubmit, setValue } = useForm()
  useEffect(() => {
    register('username')
    register('memo')
    register('amount')
    setValue('username', route?.params?.username ?? '')
  }, [register])
  const { setOptions } = useNavigation<any>()
  useEffect(() => {
    setOptions({ title: 'Send Bitcoin' })
  }, [])
  const submitThat = async ({ username, memo, amount }: any) => {
    if (!username || username.length < 4) {
      Alert.alert('Enter a real username')
      return false
    }

    if (!memo || memo.length < 1) {
      Alert.alert('Add a note')
      return false
    }

    if (!amount || amount < 2) {
      Alert.alert('Send at least 2 sats')
      return false
    }

    if (!walletStore.balance || amount > (walletStore.balance as number)) {
      Alert.alert('Insufficient balance')
      return false
    }

    const res = await walletStore.pay({
      username,
      memo,
      amount: parseInt(amount),
    })
    console.log(res)

    if (res) {
      Alert.alert('Payment successful!')
      walletStore.getBalance()
      goBack()
    }
  }
  return (
    <Screen
      preset='fixed'
      style={{
        padding: spacing[4],
        paddingTop: spacing[6],
        width: '100%',
      }}
    >
      {/* @TODO missing translation for 'To' */}
      <Text preset='header' text='To' />
      <TextField
        // @TODO missing translation for 'Username'
        placeholder='Username'
        style={{ width: '100%', marginBottom: spacing[3] }}
        onChangeText={(text: string) => setValue('username', text)}
        defaultValue={route?.params?.username ?? ''}
      />
      {/* @TODO missing translation for "For" */}
      <Text preset='header' text='For' />
      <TextField
        // @TODO missing translation for 'Pizza last night'
        placeholder='Pizza last night'
        style={{ width: '100%', marginBottom: spacing[3] }}
        onChangeText={(text: string) => setValue('memo', text)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text preset='header' text='Amount' />
        <Text
          preset='descriptionSlim'
          text={`Balance:${Math.floor(walletStore.balance ?? 0)} sats`}
          style={{ marginTop: -6, marginLeft: spacing[4] }}
        />
      </View>
      <TextField
        // @TODO missing translation for 'Pizza last night'
        placeholder='Amount (sats)'
        style={{ width: '100%', marginBottom: spacing[3] }}
        onChangeText={(text: string) => setValue('amount', text)}
      />

      {/* @TODO missing translation for 'Pay' */}
      <Button
        text='Pay'
        onPress={handleSubmit(submitThat)}
        style={{ marginTop: spacing[4] }}
      />
    </Screen>
  )
})
