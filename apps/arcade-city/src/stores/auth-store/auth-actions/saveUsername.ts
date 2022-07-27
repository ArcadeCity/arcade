import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const saveUsername = async (self: AuthStore, username: string) => {
  const api = new AuthApi(self.env.api)
  const res = await api.saveUsername(username)
  const success = res && res.success
  display({
    name: 'saveUsername',
    preview: `Received API response - ${success && 'success'}`,
    value: res,
  })
  if (success) {
    self.setUsername(username)
  }
  return true
}
