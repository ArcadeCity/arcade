import { ServiceStore } from '../service-store'
import { ServiceRequest, ServiceRequestStatus } from '../service-models'
import { ServiceApi } from 'services/api'

export const resolveRequest = async (self: ServiceStore) => {
  if (!self.activeRequest) return false

  const request: ServiceRequest = self.activeRequest

  const api = new ServiceApi(self.env.api)
  const { success } = await api.resolveRequest(request)

  if (success) {
    try {
      const freshRequest: ServiceRequest = self.activeRequest
      freshRequest.setStatus(ServiceRequestStatus.RESOLVED_BY_RIDER) // - may be unneeded
    } catch (e) {
      console.log('Error setting status to resolved')
    }

    self.decideActiveRequest()
  }

  return true
}
