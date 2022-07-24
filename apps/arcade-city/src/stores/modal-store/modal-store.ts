import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from 'stores/_extensions'

export enum ModalName {
  ADD_DETAILS = 'add-details',
  ADD_CARD = 'add-card',
  REQUEST_ACTIVE = 'request-active',
  REQUEST_BEGIN = 'request-begin',
  REQUEST_CONFIRM = 'request-confirm',
  REQUEST_VIEW = 'request-view',
}

export enum ModalStatus {
  HIDDEN = 'hidden',
  SHOWING = 'showing',
}

export const ModalStoreModel = types
  .model('ModalStore')
  .props({
    /** Name of the modal - determines which component is rendered by ModalContainer */
    name: types.maybe(types.enumeration<ModalName>(Object.values(ModalName))),
    /** Props passed to the modal */
    props: types.maybe(types.frozen()),
    /** Nearby info */
    nearby: types.maybe(types.frozen()),
    /** Modal showing or nah */
    status: types.optional(
      types.enumeration<ModalStatus>(Object.values(ModalStatus)),
      ModalStatus.HIDDEN
    ),
    /** Updating message */
    updatingMessage: types.optional(types.string, 'Updating'),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    closeModal() {
      self.status = ModalStatus.HIDDEN
    },
    setName(name: ModalName) {
      self.name = name
    },
    setNearbyCoords(lat: number, lng: number) {
      self.nearby = { lat, lng }
    },
    setUpdatingMessage(message: string) {
      self.updatingMessage = message
    },
    openModal(name: ModalName, props: any) {
      self.status = ModalStatus.SHOWING
      self.name = name
      self.props = props
    },
    reset() {
      self.name = undefined
      self.props = undefined
      self.status = ModalStatus.HIDDEN
    },
  }))

type ModalStoreType = Instance<typeof ModalStoreModel>
export interface ModalStore extends ModalStoreType {}
type ModalStoreSnapshotType = SnapshotOut<typeof ModalStoreModel>
export interface ModalStoreSnapshot extends ModalStoreSnapshotType {}
export const createModalStoreDefaultModel = () =>
  types.optional(ModalStoreModel, {})
