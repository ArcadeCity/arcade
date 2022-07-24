import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from 'stores/_extensions'
import * as actions from './relay-actions'
import { RideRequest, RideRequestModel } from './relay-models'

export const RelayStoreModel = types
  .model('RelayStore')
  .props({
    requests: types.optional(types.map(RideRequestModel), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    /** Set up ride request demo */
    initRideRequestDemo: async (): Promise<boolean> =>
      await actions.initRideRequestDemo(self as RelayStore),
    /** Save request to store */
    addRequest: (request: RideRequest) => {
      self.requests.set(request.id, request)
    },
  }))

type RelayStoreType = Instance<typeof RelayStoreModel>
export interface RelayStore extends RelayStoreType {}
type RelayStoreSnapshotType = SnapshotOut<typeof RelayStoreModel>
export interface RelayStoreSnapshot extends RelayStoreSnapshotType {}
export const createRelayStoreDefaultModel = () => types.optional(RelayStoreModel, {})
