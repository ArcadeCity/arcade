import * as React from 'react'
import { ViewStyle, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores'

const ROOT: ViewStyle = { backgroundColor: '#f0f0f0', flex: 1 }

interface StoryScreenProps {
  children?: React.ReactNode
  store: any
}

const behavior = Platform.OS === 'ios' ? 'padding' : undefined

export const StoryScreenWithStore = ({ children, store }: StoryScreenProps) => {
  const [rootStore, setRootStore] =
    React.useState<RootStore | undefined>(undefined)

  React.useEffect(() => {
    ;(async () => {
      // Check if we're on the latest app version; download and refresh if not.
      try {
        setupRootStore(store).then(setRootStore)
      } catch (e) {
        Alert.alert('An error', e.message)
      }
    })()
  }, [store])

  // Alert.alert(JSON.stringify(rootStore))
  if (!rootStore) return null

  return (
    <RootStoreProvider value={rootStore}>
      <KeyboardAvoidingView
        style={ROOT}
        behavior={behavior}
        keyboardVerticalOffset={50}
      >
        {children}
      </KeyboardAvoidingView>
    </RootStoreProvider>
  )
}
