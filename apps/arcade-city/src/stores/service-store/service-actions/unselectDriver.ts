import { ServiceStore } from '../service-store'
import { ServiceRequest } from '../service-models'
import { ServiceApi } from 'services/api'

export const unselectDriver = async (self: ServiceStore, id: number) => {
  if (!self.activeRequest) return false

  const request: ServiceRequest = self.activeRequest

  const api = new ServiceApi(self.env.api)
  const { success } = await api.unselectDriver(id, request)

  if (success) {
    try {
      console.log('Driver unselected')
      // request.setStatus(ServiceRequestStatus.CLAIMED) // - may be unneeded
      // And set the claiming driver to . . . ? How that update handled?
    } catch (e) {
      console.log('Error unselecting')
    }
  }

  return true
}
