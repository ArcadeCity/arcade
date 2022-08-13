import React from 'react'
import 'text-encoding-polyfill'
// import { NativeNavigation } from 'app/navigation/native'
// import { Provider } from 'app/provider'
import { Alert, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { palette } from 'ui/src/theme/palette'
// import { helloMessage } from 'app/test'

export default function App() {
  useEffect(() => {
    // Alert.alert(helloMessage)
    Alert.alert('Testing :)')
  }, [])
  return (
    // <Provider>
    <View style={{ flex: 1, backgroundColor: palette.electricViolet }}>
      <StatusBar style='light' />
    </View>
    // </Provider>
  )
}
