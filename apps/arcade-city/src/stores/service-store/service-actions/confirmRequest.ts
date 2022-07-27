import { getRoot } from 'mobx-state-tree'
import { ApiServiceRequest, saveServiceRequest } from '../../../services/api'
import { RootStore } from 'stores/root-store'
import { ServiceStore } from '../service-store'
import { ServiceRequest, ServiceRequestStatus } from '../service-models'
import { ServiceApi } from 'services/api'

export const confirmRequest = async (self: ServiceStore) => {
  if (!self.activeRequest) return false

  const request: ServiceRequest = self.activeRequest
  const root = getRoot(self) as RootStore

  const api = new ServiceApi(self.env.api)
  const { service_request, success } = await api.confirmRequest(request)
  if (success) {
    try {
      const freshRequest: ServiceRequest = self.activeRequest
      freshRequest.setStatus(ServiceRequestStatus.AWAITING_DRIVERS)
    } catch (e) {
      console.log(e)
    }

    // Replace temporary request with this one
    const apiSR: ApiServiceRequest = service_request
    saveServiceRequest(self, apiSR)
    const toDelete = self.activeRequest.id
    self.setActiveRequest(service_request.id.toString())

    // Delete the temporary request - but make sure it only deletes an unconfirmed request which has ID 99999
    if (toDelete === 99999) {
      self.deleteRequest(toDelete)
    }

    root.modalStore.closeModal()
  }

  return true
}
