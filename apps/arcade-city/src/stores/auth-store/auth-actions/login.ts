import { navigate, RootNavigation } from 'navigation/navigation-utilities'
import { Alert, Keyboard } from 'react-native'
import { AuthApi } from 'services/api'
import { AuthStore } from '../auth-store'

export const login = async (self: AuthStore) => {
  try {
    self.setLoggingIn(true)
    Keyboard.dismiss()
    const email = self.emailInput
    const authApi = new AuthApi(self.env.api)
    const result = await authApi.loginWithEmail(email)
    console.log(result.status)
    if (result.status === 200) {
      // cuz im using web endpoint still
      // console.log('Did we navigate to entercode')
      navigate('EnterCode')
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
