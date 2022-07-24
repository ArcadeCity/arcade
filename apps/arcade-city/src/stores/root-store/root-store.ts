import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { ModalStoreModel } from 'stores/modal-store'
import { RelayStoreModel } from 'stores/relay-store'

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    modalStore: types.optional(ModalStoreModel, {} as any),
    relayStore: types.optional(RelayStoreModel, {} as any),
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
