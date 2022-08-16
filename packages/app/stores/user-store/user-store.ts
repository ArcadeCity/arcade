import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const UserStoreModel = types.model('UserStore').props({
  mnemonic: types.maybe(types.string),
  privateKey: types.maybe(types.string),
  publicKey: types.maybe(types.string),
})

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
