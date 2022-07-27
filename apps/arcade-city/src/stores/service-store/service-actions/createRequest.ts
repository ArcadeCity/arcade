// import { uuid } from 'lib/uuid'
import { ServiceRequestModel, ServiceRequestStatus } from '../service-models'
import { ServiceStore } from '../service-store'

export const createRequest = async (
  self: ServiceStore,
  type: 'ride' | 'delivery' | 'other'
) => {
  const request = ServiceRequestModel.create({
    id: 99999, // uuid(),
    createdAt: Date.now(),
    details: '',
    paymentMethod: 'cash',
    playerRequesting: null,
    status: ServiceRequestStatus.UNCONFIRMED,
    type,
    when: Date.now(),
  })

  self.setRequest(request)
  self.setActiveRequest(request.id)
  return true
}
