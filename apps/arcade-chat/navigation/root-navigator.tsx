import React from 'react'

// import { color, typography } from '@arcadecity/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomTabNavigator } from './tab-navigator'
import { RootStackParamList } from './types'
import ModalScreen from '../screens/ModalScreen'
import { typography } from '@arcadecity/ui'
import { stackOptions } from './stackOptions'
// import { ChannelList } from '../components/ChannelList'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen
        name='Channel'
        component={ChannelScreen}
        options={{ ...modalOptions, title: 'Channel' }}
      /> */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        {/* Blank demo modal */}
        <Stack.Screen
          name='Modal'
          component={ModalScreen}
          options={{ ...stackOptions, title: 'Info' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
