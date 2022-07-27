import { Player } from '../player-models'
import { display } from 'lib'
import { PlayerStore } from '../player-store'
import { PlayerApi } from 'services/api/player-api'
import { getRoot } from 'mobx-state-tree'
import { RootStore } from 'stores/root-store'

export const getNearby = async (
  self: PlayerStore,
  lat: number,
  lng: number
) => {
  try {
    const rootStore = getRoot(self) as RootStore
    const userCoords = rootStore.authStore.coords
    // console.log(userCoords)
    const api = new PlayerApi(self.env.api)
    const res = await api.fetchNearbyPlayersLatLng(lat, lng)

    const success = res && res.success
    display({
      name: 'getNearby',
      preview: `Received API response - ${success && 'success'}`,
      value: res,
    })
    if (success) {
      res.players.forEach((player: any) => {
        const playerObj: Player = {
          id: player.id,
          bio: player.bio ?? undefined,
          city: player.city
            ? `${player.city}, ${player.admin_name}, ${player.country}`
            : null,
          guildRole: '',
          level: 1,
          nearby: true,
          profession: player.profession ?? undefined,
          profilePicture: player?.profile_picture?.url ?? undefined,
          username: player?.username ?? `Anon${player.id}`,
          cityLat: player.lat,
          cityLng: player.lng,
          distanceFromMe:
            !!userCoords ?? undefined
              ? parseFloat(
                  rootStore.authStore.distance({
                    latitude: player.lat,
                    longitude: player.lng,
                  })
                )
              : undefined,
          //   distanceFromMe: !!userCoords
          //     ? haversine(
          //         userCoords,
          //         { latitude: player.lat, longitude: player.lng },
          //         {
          //           format: '{lon,lat}',
          //         }
          //       )
          //     : null,
        }
        self.setPlayer(playerObj)
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
