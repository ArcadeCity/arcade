import {
  getEventHash, NostrEvent, NostrEventToSerialize, NostrEventToSign, signEvent
} from 'lib/nostr'
import { createNewAccount, pool } from 'lib/nostr/nostr'
import { RootStackScreenProps } from 'navigation/types'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { color } from '@arcadecity/ui'

export const NewRequestScreen = ({ navigation }: RootStackScreenProps<'NewRequest'>) => {
  const clickedNew = async () => {
    const { pubkey, priv } = createNewAccount()
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    const nostrEventToSerialize: NostrEventToSerialize = {
      created_at: dateTimeInSeconds,
      kind: 60,
      tags: [],
      content: JSON.stringify({
        from: {
          lat: 0,
          lng: 0,
        },
        to: {
          lat: 1,
          lng: 1,
        },
        name: 'ArcadeLambo',
        amount: 1337,
        expires: dateTimeInSeconds - 1,
      }),
      pubkey,
    }
    // const id = getEventHash(nostrEventToSerialize)
    // const nostrEventToSign: NostrEventToSign = {
    //   ...nostrEventToSerialize,
    //   id,
    // }
    // const sig = await signEvent(nostrEventToSign, priv)
    // const nostrEvent: NostrEvent = {
    //   ...nostrEventToSerialize,
    //   id,
    //   sig,
    // }
    // console.log(nostrEvent)

    pool.publish(nostrEventToSerialize)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Button onPress={clickedNew} title='Create Demo Request' />
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
