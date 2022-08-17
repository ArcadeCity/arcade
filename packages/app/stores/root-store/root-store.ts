import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { UserStoreModel } from '../user-store/user-store'

export const RootStoreModel = types.model('RootStore').props({
  user: types.optional(UserStoreModel, {} as any),
})

type RootStoreType = Instance<typeof RootStoreModel>
export interface RootStore extends RootStoreType {}
type RootStoreSnapshotType = SnapshotOut<typeof RootStoreModel>
export interface RootStoreSnapshot extends RootStoreSnapshotType {}
export const createRootStoreDefaultModel = () => types.optional(RootStoreModel, {})
