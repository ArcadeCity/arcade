import 'text-encoding-polyfill'
// import { NativeNavigation } from 'app/navigation/native'
// import { Provider } from 'app/provider'
import { Alert, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { helloMessage } from 'app/test'

export default function App() {
  useEffect(() => {
    Alert.alert(helloMessage)
  }, [])
  return (
    // <Provider>
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <StatusBar style='light' />
    </View>
    // </Provider>
  )
}
