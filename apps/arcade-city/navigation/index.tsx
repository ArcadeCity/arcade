/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 */
import * as React from 'react'
import { ColorSchemeName, Pressable, View, ViewStyle } from 'react-native'
import { color, palette, typography } from '@arcadecity/ui'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../constants/Colors'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import {
  RootStackParamList, RootTabParamList, RootTabScreenProps
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

const navTheme = {
  colors: {
    ...DarkTheme.colors,
    background: color.background,
  },
  dark: true,
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='Modal'
          component={ModalScreen}
          options={{
            headerStyle: {
              backgroundColor: color.tabbar,
            },
            headerTitleStyle: {
              color: color.text,
              fontFamily: typography.secondary,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='TabOne'
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
        name='TabOne'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='list-ul' color={color} focused={focused} />
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
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
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
        })}
      />
      <BottomTab.Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
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
