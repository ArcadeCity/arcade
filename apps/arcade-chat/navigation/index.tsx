/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 */
import * as React from 'react'
import { navTheme } from './navTheme'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { RootNavigator } from './root-navigator'

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}
