import { Player } from '../player-models'
import { display } from 'lib'
import { PlayerApi } from 'services/api/player-api'

export const fetchNearbyPlayers = async (self: any) => {
  try {
    // const res = await self.env.api.fetchNearbyPlayers()

    const api = new PlayerApi(self.env.api)
    const res = await api.fetchNearbyPlayers()
    const success = res && res.success
    display({
      name: 'fetchNearbyPlayers',
      preview: `Received API response - ${success && 'success'}`,
      value: res,
    })
    if (success) {
      res.players.forEach((player: any) => {
        const playerObj: Partial<Player> = {
          id: player.id,
          bio: player.bio ?? undefined,
          city: player.geo
            ? `${player.geo.city}, ${player.geo.region}, ${player.geo.isoCountryCode}`
            : null,
          guildRole: '',
          level: 1,
          nearby: true,
          profession: player.profession ?? undefined,
          profilePicture: player?.profile_picture?.url ?? undefined,
          username: player?.username ?? undefined,
        }

        self.setPlayer(playerObj)
        // log(`Set player: ${playerObj.username}`)
      })
    }
  } catch (e) {
    display({
      name: 'nice error idiot',
      preview: 'dumb',
    })
    console.log(e)
  }
  return true
}
