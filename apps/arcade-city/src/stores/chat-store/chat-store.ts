import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from 'stores/_extensions'
import * as actions from './chat-actions'
import { Chatroom, ChatroomModel } from './chat-models'
import * as views from './chat-views'

/**
 * Handles chat state
 */
export const ChatStoreModel = types
  .model('ChatStore')
  .props({
    /** The active chatroom */
    activeChatroom: types.maybe(types.reference(ChatroomModel)),
    /** The chatrooms we know about */
    chatrooms: types.optional(types.map(ChatroomModel), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    /** Initiate a 1-on-1 chat with player */
    openChatWithPlayer: async (id: number): Promise<boolean> =>
      await actions.openChatWithPlayer(self as ChatStore, id),
    /** Send message via API  */
    messageSend: async (
      message: string,
      chatroomId: number
    ): Promise<boolean> =>
      await actions.messageSend(self as ChatStore, message, chatroomId),
    /** Set up broadcast listeners via Pusher/Echo */
    setupBroadcastListeners: async (): Promise<boolean> =>
      await actions.setupBroadcastListeners(self as ChatStore),
    /** Setters */
    deleteChatroom(id: number) {
      self.chatrooms?.delete(id.toString())
    },
    setActiveChatroom(id: number) {
      self.activeChatroom = self.chatrooms?.get(id.toString())
    },
    setChatroom(chatroom: Chatroom) {
      self.chatrooms?.put(chatroom)
    },
    reset() {
      self.activeChatroom = undefined
      self.chatrooms.clear()
    },
  }))
  .views((self) => ({
    get cityChatSlug(): any {
      return views.cityChatSlug(self as ChatStore)
    },
  }))

type ChatStoreType = Instance<typeof ChatStoreModel>
export interface ChatStore extends ChatStoreType {}
type ChatStoreSnapshotType = SnapshotOut<typeof ChatStoreModel>
export interface ChatStoreSnapshot extends ChatStoreSnapshotType {}
export const createChatStoreDefaultModel = () =>
  types.optional(ChatStoreModel, {})
