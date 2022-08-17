import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { color, palette, spacing } from 'ui/src'
import { hexToNsec, useAccount, useAccountKeys } from '@arcadecity/use-arcade/src'

export const LoginScreen = ({ navigation }) => {
  const [account, accountActions] = useAccount() as any
  const keys = useAccountKeys()

  useEffect(() => {
    if (keys && keys.publicKey) {
      // Alert.alert('Logged in as ' + keys.publicKey)
      navigation.goBack()
    }
  }, [keys])

  if (!account || !accountActions) return <></>

  const onChangeText = (loginAs: string) => {
    try {
      if (loginAs.split(' ').length === 12) {
        accountActions.login({ mnemonic: loginAs })
      } else if (loginAs.startsWith('nsec')) {
        accountActions.login({ nsec: loginAs })
      } else if (loginAs.length > 12 && isHex(loginAs)) {
        accountActions.login({ nsec: hexToNsec(loginAs) })
      }
    } catch (e) {
      console.log('Error trying to validate access code')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChangeText}
        placeholder='Enter access code'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: spacing[7],
  },
  input: {
    backgroundColor: color.field,
    borderRadius: 15,
    color: color.text,
    padding: 16,
    marginVertical: 30,
  },
})

function isHex(h) {
  var a = parseInt(h, 16)
  return a.toString(16) === h.toLowerCase()
}
