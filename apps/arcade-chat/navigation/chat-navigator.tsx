import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabOneScreen from '../screens/TabOneScreen'
import { ChannelScreen } from '../screens/ChannelScreen'
import { stackOptions } from './stackOptions'
import { useNavigation } from '@react-navigation/native'
import { NavButton } from '../components/nav-button'

const Stack = createNativeStackNavigator()

export const ChatNavigator = () => {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName='chathome'>
      <Stack.Screen
        name='chathome'
        component={TabOneScreen}
        options={{ ...stackOptions, title: 'Channels' }}
      />
      <Stack.Screen
        name='channel'
        component={ChannelScreen}
        options={{
          ...stackOptions,
          title: 'Channel',
          headerLeft: () => <NavButton onPress={navigation.goBack} />,
        }}
      />
      {/* <Stack.Screen name='profile' component={Profile} options={stackOptions} /> */}
    </Stack.Navigator>
  )
}
