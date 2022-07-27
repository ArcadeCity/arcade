import { values } from 'mobx'
import { getRoot, types, Instance } from 'mobx-state-tree'
import { ChatroomModel } from '../chat-store/chat-models'
import { PlayerModel } from 'stores/player-store'
import { RootStore } from 'stores/root-store'
import * as requestViews from './service-request-views'

// Coords
export const CoordsModel = types.model('Coords').props({
  latitude: types.number,
  longitude: types.number,
})

// An address
export const AddressModel = types.model('Address').props({
  id: types.identifier,
  type: types.enumeration(['pickup', 'drop', 'waypoint']),
  waypointNum: types.maybe(types.number),
  coords: types.maybe(CoordsModel),
  prettyName: types.maybe(types.string),
})

// A user's payment method. (Card with metadata X)
export const PaymentCardModel = types.model('PaymentCard').props({
  id: types.identifierNumber,
  last4: types.string,
  expMonth: types.number,
  expYear: types.number,
  network: types.string,
})

export enum ServiceRequestStatus {
  UNCONFIRMED = 'unconfirmed',
  AWAITING_DRIVERS = 'awaiting_drivers',
  CLAIMED = 'claimed',
  // COMPLETE = 'complete',
  CANCELLED = 'cancelled',
  RESOLVED_BY_RIDER = 'resolved_by_rider',
  // RESOLVED_BY_DRIVER = 'resolved_by_driver',
  CANCELLED_BY_RIDER = 'cancelled_by_rider',
}

// ServiceRequest - seen by both rider and driver
export const ServiceRequestModel = types
  .model('ServiceRequest')
  .props({
    id: types.identifierNumber,
    addresses: types.array(AddressModel),
    chatroom: types.maybe(types.reference(ChatroomModel)),
    createdAt: types.Date,
    details: types.maybeNull(types.string),
    paymentCard: types.maybe(types.reference(PaymentCardModel)),
    paymentMethod: types.enumeration(['cash', 'card-circle']),
    playerRequesting: types.maybeNull(
      types.late(() => types.reference(PlayerModel))
    ),
    playerClaiming: types.maybe(types.reference(PlayerModel)),
    requestId: types.maybe(types.number),
    route: types.maybe(types.frozen()),
    status: types.enumeration<ServiceRequestStatus>(
      Object.values(ServiceRequestStatus)
    ),
    type: types.enumeration(['ride', 'delivery', 'other']),
    when: types.Date,
  })
  .actions((self: any) => ({
    removeAddressesOfServiceTypeExcept(type: string, addressToKeep: any) {
      const filteredAddresses = self.addresses.filter(
        (address: Address) =>
          address.type !== type || address.id === addressToKeep
      )
      self.addresses = filteredAddresses
    },
    setAddress(address: any) {
      self.addresses.push(address)
    },
    setDetails(details: string) {
      self.details = details
    },
    setPaymentCard(id: string | null) {
      if (id) {
        self.paymentCard = (
          getRoot(self) as RootStore
        ).serviceStore.paymentCards.get(id)
      } else {
        self.paymentCard = undefined
      }
    },
    setPaymentMethod(method: 'cash' | 'card-circle') {
      self.paymentMethod = method
    },
    setPlayerClaiming(id: number) {
      self.playerClaiming = id
    },
    setRequestId(id: string) {
      self.requestId = id
    },
    setRoute(route: any) {
      self.route = route
    },
    setStatus(status: ServiceRequestStatus) {
      self.status = status
    },
  }))
  .views((self: any) => ({
    get note(): string {
      if (!self.details) return ''
      return self.details
    },
    get pickup(): Address | null {
      // return MONARCH_COORDS
      let addressToReturn: any = null
      values(self.addresses).forEach((address: Address) => {
        if (address.type === 'pickup') {
          addressToReturn = address
        }
      })
      return addressToReturn
    },
    get drop(): Address | null {
      // return UNIVERSITY_COOP_COORDS
      let addressToReturn: any = null
      values(self.addresses).forEach((address: Address) => {
        if (address.type === 'drop') {
          addressToReturn = address
        }
      })
      return addressToReturn
    },
    get pickupDropShape(): any {
      return requestViews.pickupDropShape(self)
    },
    get routeShape(): any {
      return requestViews.routeShape(self)
    },
    get hasBothAddresses(): boolean {
      let hasStart = false
      let hasEnd = false
      self.addresses.forEach((address: Address) => {
        if (address.type === 'pickup') {
          hasStart = true
        } else if (address.type === 'drop') {
          hasEnd = true
        }
      })
      return hasStart && hasEnd
    },
  }))

export interface Address extends Instance<typeof AddressModel> {}
export interface Coords extends Instance<typeof CoordsModel> {}
export interface PaymentCard extends Instance<typeof PaymentCardModel> {}
export interface ServiceRequest extends Instance<typeof ServiceRequestModel> {}

export type ServiceRequestSnapshot = typeof ServiceRequestModel.SnapshotType
