import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import { Button } from 'views/shared'
import { spacing, Text } from '@arcadecity/ui'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text
        preset='description'
        text='Please try out the ride request flow and check that the request shows up in the feed.'
      />
      <Text
        preset='description'
        text="Your requests are sent to the public Nostr network and will be visible to all Nostr clients. Don't use your home address!"
      />
      <Text
        preset='description'
        text='We would appreciate your feedback on the flow of requesting a ride. How would you improve it?'
      />
      <Text
        preset='description'
        text='Feel free to email us ideas at cityhall@arcade.city, tweet at us @ArcadeCityHall, or post on our public roadmap.'
      />
      <Text preset='description' text='Swipe down from the top to close this screen.' />

      <Button
        onPress={() => Linking.openURL('https://twitter.com/ArcadeCityHall')}
        style={{ marginVertical: spacing[3] }}
        text='@ArcadeCityHall on Twitter'
      />
      <Button
        onPress={() => Linking.openURL('https://roadmap.arcade.city')}
        preset='purpleglow'
        style={{ marginVertical: spacing[3] }}
        text='Open Roadmap'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
  },
})
