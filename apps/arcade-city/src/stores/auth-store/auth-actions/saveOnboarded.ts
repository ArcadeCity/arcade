import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const saveOnboarded = async (self: AuthStore, onboarded: boolean) => {
  const api = new AuthApi(self.env.api)
  const res = await api.saveOnboarded(onboarded)
  const success = res && res.success
  display({
    name: 'saveOnboarded',
    preview: `Received API response - ${success && 'success'}`,
    value: res,
  })
  if (success) {
    self.setOnboarded(onboarded)
  }
  return true
}
