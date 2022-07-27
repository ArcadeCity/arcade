import { ExpoPushToken } from 'expo-notifications'
import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const savePushToken = async (self: AuthStore, token: ExpoPushToken) => {
  const api = new AuthApi(self.env.api)
  self.setPushToken(token.data)
  const result = await api.savePushToken(token)
  display({
    name: 'savePushToken',
    preview: `Server response: ${result.kind}`,
    value: { result, token: token.data },
  })
  return true
}
