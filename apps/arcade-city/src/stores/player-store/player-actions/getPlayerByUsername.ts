import { Alert } from 'react-native'
import { PlayerApi } from 'services/api/player-api'
import { Player, PlayerStore } from 'stores/player-store'

export const getPlayerByUsername = async (
  self: PlayerStore,
  username: string
) => {
  const api = new PlayerApi(self.env.api)
  const { success, player } = (await api.fetchPlayerByUsername(username)) as any

  if (success && !player) {
    self.setSelectedPlayer(0)
    Alert.alert(
      "No player found with that username. Probably they changed their username and it wasn't reflected in the chat - this will be fixed soon."
    )
    return false
  } else if (success) {
    const playerObj: Partial<Player> = {
      id: player.id,
      bio: player.bio ?? undefined,
      city: player.geo
        ? `${player.geo.city}, ${player.geo.region}, ${player.geo.isoCountryCode}`
        : 'Unknown location',
      guildRole: '',
      level: 1,
      // nearby:
      //   self.rootStore.authStore.geo?.isoCountryCode ===
      //   player.geo.isoCountryCode, // TODO: hax
      profession: player.profession ?? undefined,
      profilePicture: player?.profile_picture?.url ?? undefined,
      username: player?.username ?? undefined,
    }

    self.setPlayer(playerObj as Player)
    self.setSelectedPlayer(player.id.toString()) // TODO: um
    return playerObj
  } else {
    return false
  }
}
