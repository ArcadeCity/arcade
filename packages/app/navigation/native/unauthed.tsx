import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from 'app/features/home/screen'
import { LoginScreen } from 'app/features/login/LoginScreen'
import { UserDetailScreen } from 'app/features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  login: undefined
}>()

export function UnauthedNavigator() {
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
