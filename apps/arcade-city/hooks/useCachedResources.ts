import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import {
  Inter_400Regular, Inter_700Bold, useFonts
} from '@expo-google-fonts/inter'
import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend'
import { FontAwesome } from '@expo/vector-icons'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Lexend_400Regular,
    Lexend_700Bold,
  })

  // Load any resources or data that we need prior to rendering the app
  // Todo: refactor this to not hide splashscreen until fonts are also loaded via useFonts
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        setTimeout(() => {
          SplashScreen.hideAsync()
        }, 500)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete && loaded
}
