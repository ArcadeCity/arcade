import React, { useEffect } from 'react'
import 'text-encoding-polyfill'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { StatusBar } from 'expo-status-bar'
import { useExpoUpdates } from './lib/useExpoUpdates'
import { Alert } from 'react-native'

export default function App() {
  useExpoUpdates(3)
  useEffect(() => {
    Alert.alert('Test!!!')
  }, [])
  return (
    <Provider>
      <StatusBar style='light' />
      <NativeNavigation />
    </Provider>
  )
}
