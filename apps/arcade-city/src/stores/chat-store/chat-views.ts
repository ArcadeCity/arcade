import { ChatStore } from './chat-store'

export const cityChatSlug = (self: ChatStore) => {
  const city = self.rootStore.authStore.geo?.city
  const region = self.rootStore.authStore.geo?.region
  const isoCountryCode = self.rootStore.authStore.geo?.isoCountryCode
  if (!city || !region || !isoCountryCode) {
    return null
  }
  return `City.${city}.${region}.${isoCountryCode}`
}
