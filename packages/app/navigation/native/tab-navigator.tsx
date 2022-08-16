import React from 'react'
import { View, ViewStyle } from 'react-native'
import { color, palette, typography } from '@arcadecity/ui'
import { FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ChatScreen } from 'app/features/chat/screen'

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<{ MapHome: undefined; AccountHome: undefined }>()

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='MapHome'
      screenOptions={{
        tabBarActiveTintColor: palette.moonRaker,
        tabBarInactiveTintColor: palette.blueBell,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: color.tabbar,
          borderTopWidth: 2,
          borderTopColor: palette.portGore,
          paddingTop: 10,
        },
      }}>
      <BottomTab.Screen
        name='MapHome'
        component={ChatScreen}
        options={{
          title: 'Map',
          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='list-ul' color={color} focused={focused} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      />
      <BottomTab.Screen
        name='AccountHome'
        component={ChatScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user-alt' color={color} focused={focused} />
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      />
      {/* <BottomTab.Screen
        name='WalletHome'
        component={AccountHome}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='wallet' color={color} focused={focused} />
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      /> */}
      {/* <BottomTab.Screen
        name='AccountHome'
        component={AccountHome}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user-alt' color={color} focused={focused} />
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      /> */}
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  color: string
  focused: boolean
  name: React.ComponentProps<typeof FontAwesome5>['name']
}) {
  return (
    <>
      <FontAwesome5 size={32} {...props} />
      {props.focused && <View style={ACTIVE_INDICATOR} />}
    </>
  )
}

const ACTIVE_INDICATOR: ViewStyle = {
  position: 'absolute',
  bottom: -8,
  height: 4,
  width: 4,
  borderRadius: 2,
  backgroundColor: color.highlight,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 4,
  shadowColor: 'rgb(244,89,244)', //color.highlight,
}
