import { display } from 'lib'
import { AuthApi } from 'services/api'
import { AuthStore } from 'stores/auth-store'

export const fetchNearbyWorldcities = async (self: AuthStore) => {
  const api = new AuthApi(self.env.api)
  const res = await api.fetchNearbyWorldcities()
  console.log(res)
  // const success = res && res.success
  // display({
  //   name: 'saveBio',
  //   preview: `Received API response - ${success && 'success'}`,
  //   value: res,
  // })
  // if (success) {
  //   self.setBio(bio)
  // }
  return true
}
