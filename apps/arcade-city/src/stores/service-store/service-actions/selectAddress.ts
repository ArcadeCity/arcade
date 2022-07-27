import { display } from 'lib'
import { Address, AddressModel, Coords, CoordsModel } from '../service-models'
import { ServiceStore } from '../service-store'

export const selectAddress = async (
  self: ServiceStore,
  address: any,
  addressType: string
) => {
  if (!self.activeRequest) return false

  display({
    name: 'selectAddress',
    preview: 'Selected address',
    value: { address, addressType },
  })

  const type = addressType === 'start' ? 'pickup' : 'drop'
  const coords: Coords = CoordsModel.create({
    latitude: address.center[1],
    longitude: address.center[0],
  })

  const addressToSave: Address = AddressModel.create({
    id: address.id,
    type,
    coords,
    prettyName: address.place_name,
  })

  self.activeRequest.setAddress(addressToSave)
  self.activeRequest.removeAddressesOfServiceTypeExcept(type, address.id)

  return true
}
