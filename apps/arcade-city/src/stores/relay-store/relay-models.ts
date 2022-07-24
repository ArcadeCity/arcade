import { Instance, types } from 'mobx-state-tree'

export const RideRequestModel = types.model('RideRequest').props({
  amount: types.number,
  created_at: types.number,
  expires: types.number,
  from: types.frozen(),
  id: types.identifier,
  name: types.string,
  pubkey: types.string,
  sig: types.string,
  tags: types.frozen(),
  to: types.frozen(),
  type: types.maybe(types.string),
})

export interface RideRequest extends Instance<typeof RideRequestModel> {}
