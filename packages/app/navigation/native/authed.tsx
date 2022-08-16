import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChatScreen } from 'app/features/chat/screen'

const Stack = createNativeStackNavigator<{
  chat: undefined
}>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='chat'
        component={ChatScreen}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
    </Stack.Navigator>
  )
}
