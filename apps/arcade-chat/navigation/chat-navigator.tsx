import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabOneScreen from '../screens/TabOneScreen'
import { ChannelScreen } from '../screens/ChannelScreen'
import { stackOptions } from './root-navigator'

const Stack = createNativeStackNavigator()

export const ChatNavigator = () => (
  <Stack.Navigator initialRouteName='chathome'>
    <Stack.Screen
      name='chathome'
      component={TabOneScreen}
      options={{ ...stackOptions, title: 'Channels' }}
    />
    <Stack.Screen
      name='channel'
      component={ChannelScreen}
      options={{ ...stackOptions, title: 'Channel' }}
    />
    {/* <Stack.Screen name='profile' component={Profile} options={stackOptions} /> */}
  </Stack.Navigator>
)
