import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { LoginScreen } from 'app/features/login/LoginScreen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  login: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name='user-detail'
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='login'
          component={LoginScreen}
          options={{ title: 'Log in with access code' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
