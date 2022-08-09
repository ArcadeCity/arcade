import React from 'react'
import { View, Text } from 'dripsy'
import { TextLink } from 'solito/link'

export default function ComponentsScreen() {
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}>Let's see components</Text>
      <TextLink href='/'>👈 Go Home</TextLink>
      <TextLink href='/components/channel-preview'>Channel Preview</TextLink>
    </View>
  )
}
