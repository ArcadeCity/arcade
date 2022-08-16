import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { color, palette, spacing } from 'ui/src'

export const LoginScreen = () => {
  const [loginAs, setLoginAs] = useState('')
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={(text) => setLoginAs(text)}
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
