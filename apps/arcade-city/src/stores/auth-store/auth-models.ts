import { Instance, types } from 'mobx-state-tree'

export const AccessTokensModel = types.model('AccessTokens').props({
  api: types.maybeNull(types.string),
  magic: types.maybeNull(types.string),
  push: types.maybeNull(types.string),
})

export const AuthedPlayerModel = types.model('AuthedPlayer').props({
  id: types.number,
  // acceptedTerms: types.maybeNull(types.string),
  bio: types.maybeNull(types.string),
  // invited: types.boolean,
  // invites: types.number,
  level: types.number,
  locale: types.maybeNull(types.string),
  onboarded: types.maybeNull(types.boolean),
  profession: types.maybeNull(types.string),
  // profilePicture: types.maybeNull(types.string),
  // referrer_user_id: types.number,
  // solAddress: types.maybeNull(types.string),
  username: types.maybeNull(types.string),
})

export const GeoModel = types.model('Geo').props({
  postalCode: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  region: types.maybeNull(types.string),
  country: types.maybeNull(types.string),
  isoCountryCode: types.maybeNull(types.string),
})

export const OnboardingModel = types.model('Onboarding').props({
  acceptedTerms: types.maybeNull(types.string),
  bio: types.maybeNull(types.string),
  codeSent: types.optional(types.boolean, false),
  profession: types.maybeNull(types.string),
})

export const PermissionsModel = types.model('Permissions').props({
  location: types.maybe(types.frozen()),
  notifications: types.maybe(types.frozen()),
})

export interface SimpleCoords {
  latitude: number
  longitude: number
}

type AccessTokensType = Instance<typeof AccessTokensModel>
export interface AccessTokens extends AccessTokensType {}

type AuthedPlayerType = Instance<typeof AuthedPlayerModel>
export interface AuthedPlayer extends AuthedPlayerType {}

type GeoType = Instance<typeof GeoModel>
export interface Geo extends GeoType {}

type PermissionsModelType = Instance<typeof PermissionsModel>
export interface PermissionsModel extends PermissionsModelType {}
