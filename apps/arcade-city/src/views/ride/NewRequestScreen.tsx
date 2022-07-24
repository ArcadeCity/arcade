import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { color } from '@arcadecity/ui'

export const NewRequestScreen = () => {
  const clickedNew = () => console.log('yoooo')
  return (
    <View style={styles.container}>
      <Button onPress={clickedNew} title='Create' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.background,
  },
})
