import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { AuthStoreModel } from 'stores/auth-store'
import { ChatStoreModel } from 'stores/chat-store'
import { ModalStoreModel } from 'stores/modal-store'
import { PlayerStoreModel } from 'stores/player-store'
import { RelayStoreModel } from 'stores/relay-store'
import { ServiceStoreModel } from 'stores/service-store'

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    authStore: types.optional(AuthStoreModel, {} as any),
    chatStore: types.optional(ChatStoreModel, {} as any),
    modalStore: types.optional(ModalStoreModel, {} as any),
    playerStore: types.optional(PlayerStoreModel, {} as any),
    relayStore: types.optional(RelayStoreModel, {} as any),
    serviceStore: types.optional(ServiceStoreModel, {} as any),
  })
  .actions((self) => ({
    reset() {
      self.modalStore.reset()
    },
  }))

type RootStoreType = Instance<typeof RootStoreModel>
export interface RootStore extends RootStoreType {}
type RootStoreSnapshotType = SnapshotOut<typeof RootStoreModel>
export interface RootStoreSnapshot extends RootStoreSnapshotType {}
export const createRootStoreDefaultModel = () => types.optional(RootStoreModel, {})
