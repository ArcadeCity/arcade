import { display } from 'lib'
import { Alert } from 'react-native'
import { AuthApi } from 'services/api'
import { AuthedPlayer, AuthStore } from 'stores/auth-store'

export const onboardPlayer = async (self: AuthStore) => {
  const api = new AuthApi(self.env.api)
  const { acceptedTerms, bio, profession } = self.onboarding
  const onboardParams = {
    acceptedTerms,
    bio,
    geo: {
      ...self.geo,
      latitude: self.location?.coords?.latitude ?? null,
      longitude: self.location?.coords?.longitude ?? null,
    },
    profession,
  }
  const res: any = await api.onboardPlayer(onboardParams)
  if (res.success) {
    const user = res.user
    const player: AuthedPlayer = {
      bio: user.bio,
      id: user.id,
      level: 1,
      locale: null,
      onboarded: user.onboarded,
      profession: user.profession,
      username: user.username,
    }
    self.setAuthedPlayer(player)
  }

  // const res = await api.saveOnboarded(onboarded)
  // const success = res && res.success
  // display({
  //   name: 'saveOnboarded',
  //   preview: `Received API response - ${success && 'success'}`,
  //   value: res,
  // })
  // if (success) {
  //   self.setOnboarded(onboarded)
  // }
  return true
}
