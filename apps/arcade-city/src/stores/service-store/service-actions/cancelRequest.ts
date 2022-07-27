import { ServiceApi } from 'services/api'
import { ServiceRequest, ServiceRequestStatus } from '../service-models'
import { ServiceStore } from '../service-store'

export const cancelRequest = async (self: ServiceStore) => {
  if (!self.activeRequest) return false

  const request: ServiceRequest = self.activeRequest

  const api = new ServiceApi(self.env.api)
  const { success } = await api.cancelRequest(request)

  if (success) {
    try {
      const freshRequest: ServiceRequest = self.activeRequest
      freshRequest.setStatus(ServiceRequestStatus.CANCELLED_BY_RIDER)
    } catch (e) {
      console.log('Error setting status to cancelled')
    }

    self.decideActiveRequest()
    self.rootStore.modalStore.closeModal()
    // Alert.alert('Request cancelled') // , 'Drivers have been notified'
  }

  return true
}
