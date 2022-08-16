import { Alert, Keyboard } from 'react-native'
import { UserStore } from '../user-store'

export const login = async (self: UserStore) => {
  try {
    // self.setLoggingIn(true)
    Keyboard.dismiss()
    console.log('Hey.')
    // self.setLoggingIn(false)
  } catch (e) {
    // self.setLoggingIn(false)
    Alert.alert('Login error')
    console.log(e)
  }
  return true
}
