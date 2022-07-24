import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '@arcadecity/ui'
import { RootStackScreenProps } from '../types'

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={styles.container}>
      <Text preset='title2' text="This screen doesn't exist." />
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text preset='description' text='Go to home screen!' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
