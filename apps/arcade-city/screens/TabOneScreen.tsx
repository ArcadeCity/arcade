import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@arcadecity/ui'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text preset='title' text='Tab One' />
      <Text preset='description' text='Hello world' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
