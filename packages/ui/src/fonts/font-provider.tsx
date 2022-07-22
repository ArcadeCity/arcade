import React from 'react'
import {
  Inter_400Regular, Inter_700Bold, useFonts
} from '@expo-google-fonts/inter'
import { Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend'

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('trying to load shite')
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Lexend_400Regular,
    Lexend_700Bold,
  })
  console.log('loaded:', loaded)
  // if (!loaded) return <></>
  return <>{children}</>
}
