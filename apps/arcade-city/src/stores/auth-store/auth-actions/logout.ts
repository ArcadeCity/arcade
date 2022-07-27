// import { Auth } from 'aws-amplify'
import { display } from 'lib'
import { goBack } from 'navigation/navigation-utilities'
import { AuthStore } from '../auth-store'

export const logout = async (self: AuthStore) => {
  const id = self.player?.id
  // try {
  //   self.env.broadcasting.echo.leave(`user.${id}`)
  // } catch (e) {
  //   console.log('No broadcasting channel to leave')
  // }
  // goBack()
  self.rootStore.reset()
  // self.env.api.apisauce.setHeaders({})
  display({
    name: 'logout',
    preview: `State reset`,
  })

  // Auth.signOut()

  return true
}
