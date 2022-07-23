import React from 'react'
import { StyleSheet, View } from 'react-native'
import { spacing } from '@arcadecity/ui'
import { useStore } from '../src/lib/nostr/store'
import { RequestFeed } from '../src/views/RequestFeed'
import { RootTabScreenProps } from '../types'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const requests = useStore((s) => s.requests)
  return (
    <View style={styles.container}>
      <RequestFeed requests={requests} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing[2],
  },
})
