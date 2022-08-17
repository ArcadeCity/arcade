import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabNavigator } from './tab-navigator'

const Stack = createNativeStackNavigator<{
  tabs: undefined
}>()

export function AuthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='tabs'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
    </Stack.Navigator>
  )
}
