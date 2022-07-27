import { PlayerApi } from 'services/api/player-api'
import { PlayerStore } from '../player-store'

export const fetchNearbyReport = async (self: PlayerStore) => {
  try {
    const api = new PlayerApi(self.env.api)
    const res = await api.fetchNearbyReport()
    const success = res && res.success
    console.tron.display({
      name: 'fetchNearbyReport',
      preview: `Received API response - ${success && 'success'}`,
      value: res,
    })

    self.setNearby(res)

    // if (success) {
    //     res.nearby.forEach((nearbo: any) => {
    //         log(nearbo)
    //     })
    // }

    // if (success) {
    //     res.nearby.forEach((user: any) => {
    //         const { profession, hav } = user
    //         log(`${profession} is ${hav} km from you`)
    //     })
    // }
  } catch (e) {
    console.log(e)
    // console.tron.display({
    //   name: e.message,
    //   preview: 'dumb',
    //   value: e.message,
    // })
  }
  return true
}
