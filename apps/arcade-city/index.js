import { registerRootComponent } from 'expo'
import Bugsnag from '@bugsnag/expo'

import App from './App'

if (!__DEV__) {
  Bugsnag.start()
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
