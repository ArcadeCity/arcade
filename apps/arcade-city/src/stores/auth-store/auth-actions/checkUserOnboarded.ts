import { Alert } from 'react-native'
import { AuthApi } from 'services/api'
import { AuthStore } from '../auth-store'

export const checkUserOnboarded = async (self: AuthStore) => {
  const authApi = new AuthApi(self.env.api)
  const result: any = await authApi.checkUserOnboarded(self.emailInput)
  const data = await result.data
  if (data.success) {
    const onboarded = data.onboarded as boolean
    return onboarded
  } else {
    return false
  }
}
