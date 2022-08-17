import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './user-actions'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    mnemonic: types.maybe(types.string),
    privateKey: types.maybe(types.string),
    publicKey: types.maybe(types.string),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    login: async (): Promise<boolean> => await actions.login(self as UserStore),
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
