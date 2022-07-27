import { RootNavigation } from 'navigation/navigation-utilities'
import { Alert, Keyboard } from 'react-native'
import { AuthApi } from 'services/api'
import { AuthStore } from '../auth-store'

export const verifyEmail = async (self: AuthStore) => {
  try {
    self.setLoggingIn(true)
    Keyboard.dismiss()
    const email = self.emailInput
    self.setEmailInput('')
    const authApi = new AuthApi(self.env.api)
    const result = await authApi.loginWithEmail(email)
    if (result.ok) {
      console.log('ok')
      self.setCodeSent(true)
      // RootNavigation.navigate('EnterCode')
    } else {
      Alert.alert("That didn't work - try again!")
    }
    self.setLoggingIn(false)
  } catch (e) {
    self.setLoggingIn(false)
    Alert.alert('Login error')
    console.log(e)
  }
  return true
}
