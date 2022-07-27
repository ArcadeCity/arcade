import { values } from 'mobx'
import { types, Instance, SnapshotOut } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from 'stores/_extensions'
import {
  PaymentCard,
  PaymentCardModel,
  ServiceRequestModel,
  ServiceRequest,
} from './service-models'
import * as actions from './service-actions'

export const ServiceStoreModel = types
  .model('ServiceStore')
  .props({
    /** Active request */
    activeRequest: types.maybe(types.reference(ServiceRequestModel)),
    /** Mapbox address search results */
    addressSearchResults: types.maybe(types.frozen()),
    /** Payment cards we know about */
    paymentCards: types.optional(types.map(PaymentCardModel), {}),
    /** Service requests we know about */
    serviceRequests: types.optional(types.map(ServiceRequestModel), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self: any) => ({
    /** Cancel active request */
    cancelRequest: async (): Promise<boolean> =>
      await actions.cancelRequest(self as ServiceStore),
    /** Confirm active request, submit to API and notify drivers */
    confirmRequest: async (): Promise<boolean> =>
      await actions.confirmRequest(self as ServiceStore),
    /** Create request we can start filling in details for */
    createRequest: async (
      serviceType: 'ride' | 'delivery' | 'other'
    ): Promise<boolean> =>
      await actions.createRequest(self as ServiceStore, serviceType),
    /** Grab the Mapbox directions route between two points */
    fetchRequestRoute: async (request: ServiceRequest): Promise<boolean> =>
      await actions.fetchRequestRoute(self as ServiceStore, request),
    /** Resolve active request */
    resolveRequest: async (): Promise<boolean> =>
      await actions.resolveRequest(self as ServiceStore),
    /** Grab the Mapbox address by search string */
    searchForAddress: async (search: string): Promise<boolean> =>
      await actions.searchForAddress(self as ServiceStore, search),
    /** Select the Mapbox address and set as address for activeRequest */
    selectAddress: async (
      address: any,
      addressType: 'start' | 'end'
    ): Promise<boolean> =>
      await actions.selectAddress(self as ServiceStore, address, addressType),
    /** Assign driver to this request */
    selectDriver: async (id: number): Promise<boolean> =>
      await actions.selectDriver(self as ServiceStore, id),
    /** Un-assign driver to this request */
    unselectDriver: async (id: number): Promise<boolean> =>
      await actions.unselectDriver(self as ServiceStore, id),
    /** Setters */
    decideActiveRequest() {
      const userId = self.rootStore.authStore.id
      const reqs: any = values(self.serviceRequests)
        .filter(
          (req: ServiceRequest) =>
            req.playerRequesting?.id === userId &&
            req.status !== 'cancelled_by_rider' &&
            req.status !== 'resolved_by_rider'
        )
        .sort((a: ServiceRequest, b: ServiceRequest) =>
          b.createdAt > a.createdAt ? 1 : -1
        )
      if (reqs.length > 0) {
        self.activeRequest = reqs[0].id
      } else {
        self.activeRequest = undefined
      }
    },
    deleteRequest(requestId: number) {
      self.serviceRequests.delete(requestId)
    },
    setActiveRequest(id: number | undefined) {
      if (id) {
        self.activeRequest = self.serviceRequests.get(id)
      } else {
        self.activeRequest = undefined
      }
    },
    setAddressSearchResults(results: any) {
      self.addressSearchResults = results
    },
    setPaymentCard(paymentCard: PaymentCard) {
      self.paymentCards.put(paymentCard)
    },
    setRequest(request: ServiceRequest) {
      self.serviceRequests.put(request)
    },
    reset() {
      self.activeRequest = undefined
      self.addresses = undefined
      self.serviceRequests = undefined
    },
  }))
  .views((self: any) => ({
    get hasActiveServiceRequest(): boolean {
      const userId = self.rootStore.authStore.id
      const reqs: any = values(self.serviceRequests).filter(
        (req: ServiceRequest) =>
          req.playerRequesting?.id === userId &&
          req.status !== 'cancelled_by_rider' &&
          req.status !== 'unconfirmed' &&
          req.status !== 'resolved_by_rider'
      )
      const has = reqs.length > 0
      return has
    },
    get sortedRequests(): ServiceRequest[] {
      const reqs: any = values(self.serviceRequests)
      const sorted = reqs.sort((a: any, b: any) => {
        return b.createdAt - a.createdAt
      })
      return sorted.filter(
        (a: ServiceRequest) =>
          a.hasBothAddresses &&
          !!a.playerRequesting &&
          a.id.toString().length < 10
      )
    },
  }))

type ServiceStoreType = Instance<typeof ServiceStoreModel>
export interface ServiceStore extends ServiceStoreType {}
type ServiceStoreSnapshotType = SnapshotOut<typeof ServiceStoreModel>
export interface ServiceStoreSnapshot extends ServiceStoreSnapshotType {}
export const createServiceStoreDefaultModel = () =>
  types.optional(ServiceStoreModel, {})
