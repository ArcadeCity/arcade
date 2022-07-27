import { RootNavigation } from 'navigation/navigation-utilities'
import { Alert, Keyboard } from 'react-native'
import { AuthApi } from 'services/api'
import { afterLogin } from '../afterLogin'
import { AuthedPlayer } from '../auth-models'
import { AuthStore } from '../auth-store'

export const enterCode = async (self: AuthStore) => {
  try {
    self.setLoggingIn(true)
    Keyboard.dismiss()
    const code = self.emailCodeInput
    const authApi = new AuthApi(self.env.api)
    const result = await authApi.enterCode(code)
    if (result.kind === 'ok') {
      self.setApiToken(result.token)
      afterLogin(self, result)
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
