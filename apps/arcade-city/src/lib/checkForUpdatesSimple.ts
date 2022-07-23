import * as Updates from 'expo-updates'
import { Alert } from 'react-native'

export const checkForUpdatesSimple = async () => {
  if (__DEV__) return
  const check = await Updates.checkForUpdateAsync()
  if (check.isAvailable) {
    try {
      await Updates.fetchUpdateAsync()
      Alert.alert('Updating')
      await Updates.reloadAsync()
    } catch (e) {
      console.log(e)
    }
  }
}
