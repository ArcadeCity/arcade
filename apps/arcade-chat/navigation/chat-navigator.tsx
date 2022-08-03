import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabOneScreen from '../screens/TabOneScreen'
import { ChannelScreen } from '../screens/ChannelScreen'
import { stackOptions } from './stackOptions'
import { useNavigation } from '@react-navigation/native'
import { NavButton } from '../components/nav-button'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { palette } from '@arcadecity/ui'
import {
  ArcadeContext,
  formatEvent,
  updateDemoChannelMetadata,
  useActiveChannelId,
} from '@arcadecity/use-arcade'

const Stack = createNativeStackNavigator()

export const ChatNavigator = () => {
  const navigation = useNavigation()
  const activeChannelId = useActiveChannelId()
  const context = useContext(ArcadeContext)
  const demoUpdateMetadata = async () => {
    if (!activeChannelId) return
    const metadataEvent = await updateDemoChannelMetadata(activeChannelId)
    console.log(metadataEvent)
    const formattedEvent = formatEvent(metadataEvent)
    context.ws.send(formattedEvent)
  }
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
          headerRight: () => (
            <Pressable
              onPress={demoUpdateMetadata}
              // onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name='info-circle'
                size={25}
                color={palette.moonRaker}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
      />
      {/* <Stack.Screen name='profile' component={Profile} options={stackOptions} /> */}
    </Stack.Navigator>
  )
}
