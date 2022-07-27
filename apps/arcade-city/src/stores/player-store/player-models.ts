import { Instance, types } from 'mobx-state-tree'

export const PlayerModel = types.model('Player').props({
  id: types.identifierNumber,
  bio: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  cityLat: types.maybe(types.number),
  cityLng: types.maybe(types.number),
  distanceFromMe: types.maybe(types.number),
  guildRole: types.optional(types.string, 'Placeholder'),
  level: types.maybeNull(types.integer),
  nearby: types.maybeNull(types.boolean),
  profession: types.maybeNull(types.string),
  profilePicture: types.maybeNull(types.string),
  username: types.maybeNull(types.string),
})

export interface Player extends Instance<typeof PlayerModel> {}
