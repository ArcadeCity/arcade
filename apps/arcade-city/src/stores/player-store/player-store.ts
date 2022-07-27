import { values } from 'mobx'
import { getRoot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from 'stores/_extensions'
import * as actions from './player-actions'
import { Player, PlayerModel } from './player-models'

/**
 * Handles state for other users (players)
 */
export const PlayerStoreModel = types
  .model('PlayerStore')
  .props({
    nearby: types.optional(types.frozen(), {}),
    /** The players we know about */
    players: types.optional(types.map(PlayerModel), {}),
    /** The selected player like in a profile */
    selectedPlayer: types.maybe(types.reference(PlayerModel)),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    /** Fetch player objects for nearby users (<50km) */
    fetchNearbyPlayers: async (): Promise<boolean> =>
      await actions.fetchNearbyPlayers(self as PlayerStore),
    /** Fetch info via API for report on who's nearby */
    fetchNearbyReport: async (): Promise<boolean> =>
      await actions.fetchNearbyReport(self as PlayerStore),
    /** Fetch player objects for nearby users (<50km) */
    getNearby: async (lat: number, lng: number): Promise<boolean> =>
      await actions.getNearby(self as PlayerStore, lat, lng),
    /** Get the player object for this username, pulling from API if needed */
    getPlayerByUsername: async (
      username: string
    ): Promise<boolean | Partial<Player>> =>
      await actions.getPlayerByUsername(self as PlayerStore, username),
    setNearby(value: any) {
      self.nearby = value
    },
    setPlayer(player: Player) {
      self.players?.put(player)
    },
    setPlayers(players: Player[]) {
      players.forEach((player: Player) => {
        self.players?.put(player)
      })
    },
    setSelectedPlayer(id: number) {
      self.selectedPlayer = self.players?.get(id.toString())
    },
    reset() {
      self.selectedPlayer = undefined
      self.players.clear()
    },
  }))
  .views((self) => ({
    get nearbyPlayers() {
      const coords = self.rootStore.authStore.coords
      if (!coords || coords.latitude === 0 || coords.longitude === 0) {
        return values(self.players)
      }
      const players = [...values(self.players)]
        .filter((a: any) => a.distanceFromMe !== 0)
        .sort((a: any, b: any) =>
          b.distanceFromMe > a.distanceFromMe ? -1 : 1
        )
      return players
    },
  }))

type PlayerStoreType = Instance<typeof PlayerStoreModel>
export interface PlayerStore extends PlayerStoreType {}
type PlayerStoreSnapshotType = SnapshotOut<typeof PlayerStoreModel>
export interface PlayerStoreSnapshot extends PlayerStoreSnapshotType {}
export const createPlayerStoreDefaultModel = () =>
  types.optional(PlayerStoreModel, {})
