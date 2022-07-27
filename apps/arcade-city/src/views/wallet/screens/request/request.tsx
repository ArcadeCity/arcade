import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Linking, View, ViewStyle } from 'react-native'
import { useStores } from 'stores'
import { Button, Screen, Text } from 'views/shared'
import { palette, spacing } from 'views/theme'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const Request = observer(() => {
  const { walletStore } = useStores()

  const { navigate, setOptions } = useNavigation<any>()
  useEffect(() => {
    setOptions({ title: 'Request Payment' })
  }, [])

  return (
    <Screen
      preset='scrollStack'
      style={{
        padding: spacing[4],
        paddingTop: spacing[6],
        width: '100%',
      }}
      // dock={
      //   <View style={DOCK}>
      //     <Button
      //       style={BUTTON}
      //       preset='secondary'
      //       text='Open LNbits'
      //       onPress={() => Linking.openURL(walletStore.lnbitsUrl)}
      //       // onPress={handleSubmit(submitThat)}
      //     />
      //   </View>
      // }
    >
      <Text preset='title' text='Request payment' />
      <Text
        preset='description'
        text='For now the only way to request payment is by sharing a Lightning invoice you create via the LNbits interface.'
      />

      <Text
        preset='description'
        text='All Arcade City Lightning wallets use LNbits under the hood. Until we add invoice support into the app, you can use the LNbits interface directly.'
      />

      <Button
        style={BUTTON}
        preset='secondary'
        text='Open LNbits'
        onPress={() => Linking.openURL(walletStore.lnbitsUrl)}
        // onPress={handleSubmit(submitThat)}
      />

      <Text
        preset='description'
        text="In an upcoming update, you'll be able to request payment directly from your contacts."
        style={{ marginTop: 20 }}
      />
    </Screen>
  )
})

const DOCK: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}

const BUTTON: ViewStyle = {
  marginVertical: spacing[2],
}

const CONTAINER: ViewStyle = {
  paddingBottom: spacing[7],
  paddingTop: spacing[5],
}
