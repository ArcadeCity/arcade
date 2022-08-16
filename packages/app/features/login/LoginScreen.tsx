import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { color, palette, spacing } from 'ui/src'
import { hexToNsec, useAccount } from '@arcadecity/use-arcade/src'

export const LoginScreen = () => {
  const [loginAs, setLoginAs] = useState('')
  const [account, accountActions] = useAccount() as any
  if (!account || !accountActions) return <></>

  const onChangeText = (text: string) => {
    setLoginAs(text)
    try {
      if (loginAs.split(' ').length === 12) {
        accountActions.login({ mnemonic: loginAs })
      } else if (loginAs.startsWith('nsec')) {
        accountActions.login({ nsec: loginAs })
      } else if (isHex(loginAs)) {
        accountActions.login({ nsec: hexToNsec(loginAs) })
      } else {
        console.log('Not valid access code')
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
