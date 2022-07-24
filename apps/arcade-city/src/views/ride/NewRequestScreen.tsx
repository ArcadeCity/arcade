import {
  getEventHash, NostrEvent, NostrEventToSerialize, NostrEventToSign, signEvent
} from 'lib/nostr'
import { createNewAccount } from 'lib/nostr/nostr'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { color } from '@arcadecity/ui'

export const NewRequestScreen = () => {
  const clickedNew = async () => {
    const { pubkey, priv } = createNewAccount()
    const nostrEventToSerialize: NostrEventToSerialize = {
      created_at: Date.now(),
      kind: 1,
      tags: [],
      content: 'My apartment smells of rich mahogany',
      pubkey,
    }
    console.log(nostrEventToSerialize)
    const id = getEventHash(nostrEventToSerialize)
    console.log(id)

    const nostrEventToSign: NostrEventToSign = {
      ...nostrEventToSerialize,
      id,
    }
    console.log('nostrEventToSign', nostrEventToSign)

    try {
      const sig = await signEvent(nostrEventToSign, priv)
      console.log(sig)
    } catch (e) {
      console.error(e)
      console.log(e)
    }

    // const nostrEvent: NostrEvent = {
    //   ...nostrEventToSerialize,
    //   id,
    //   sig,
    // }
    // console.log('NOSTREVENT --- ', nostrEvent)
  }
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
