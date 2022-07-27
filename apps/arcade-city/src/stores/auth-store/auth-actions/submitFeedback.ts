import { AuthStore } from 'stores/auth-store'
import { AuthApi } from 'services/api'
import { display } from 'lib'

export const submitFeedback = async (self: AuthStore, feedback: string) => {
  const api = new AuthApi(self.env.api)

  display({
    name: 'submitFeedback',
    preview: `Attempting with feedback ${feedback}`,
  })

  if (feedback.length < 3) {
    return false
  }
  const res = await api.submitFeedback(feedback)

  display({
    name: 'submitFeedback',
    preview: `Received API response - ${res && res.success && 'success'}`,
    value: res,
  })

  return true
}
