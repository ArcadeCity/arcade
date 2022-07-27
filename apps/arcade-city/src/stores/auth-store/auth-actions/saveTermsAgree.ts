import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const saveTermsAgree = async (self: AuthStore, whenAgree: Date) => {
  self.setTermsAgree(whenAgree)
  // const api = new AuthApi(self.env.api)
  // const res = await api.saveTermsAgree(whenAgree)
  // const success = res && res.success
  // display({
  //   name: 'saveTermsAgree',
  //   preview: `Received API response - ${success && 'success'}`,
  //   value: res,
  // })
  // if (success) {
  //   self.setTermsAgree(whenAgree)
  // }
  return true
}
