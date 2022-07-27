import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const saveProfession = async (
  self: AuthStore,
  profession: string,
  apiPersist: boolean = false
) => {
  const api = new AuthApi(self.env.api)
  const res = await api.saveProfession(profession)

  if (apiPersist) {
    console.log(res)
    const success = res && res.success
    display({
      name: 'saveProfession',
      preview: `Received API response - ${success && 'success'}`,
      value: res,
    })
    if (success) {
      self.setProfession(profession)
    }
  } else {
    self.setProfession(profession, true)
  }

  return true
}
