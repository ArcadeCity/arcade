import { getRoot } from 'mobx-state-tree'
// import { ChatApi } from 'services/api/chat-api'
import { ChatStore } from 'stores/chat-store'
import { RootStore } from 'stores/root-store'

export const messageSend = async (self: ChatStore, message: string, chatroomId: number) => {
  // const chatApi = new ChatApi(self.env.api)
  // const userId = (getRoot(self) as RootStore).authStore.player?.id
  // if (!userId) return false
  // await chatApi.sendMessage(message, chatroomId, userId)
  return true
}
