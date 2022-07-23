import { registerRootComponent } from 'expo'
import * as Sentry from 'sentry-expo'

import App from './src/App'

Sentry.init({
  dsn: 'https://b8e365e42bc742b3a34fecbacf81b5f5@o343125.ingest.sentry.io/6595759',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
