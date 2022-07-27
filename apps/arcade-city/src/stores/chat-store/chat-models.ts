import { toJS } from 'mobx'
import { getRoot, Instance, types } from 'mobx-state-tree'
import { Player } from 'stores/player-store'
import { RootStore } from 'stores/root-store'

export const MessageModel = types
  .model('Message')
  .props({
    id: types.identifierNumber,
    text: types.string,
    chatroomId: types.number,
    userId: types.number,
    createdAt: types.Date,
  })
  .views((self) => ({
    get player(): Player | undefined {
      const root = getRoot(self) as RootStore
      return root.playerStore?.players?.get(self.userId.toString()) ?? undefined
    },
  }))

export const ChatroomModel = types
  .model('Chatroom')
  .props({
    id: types.identifierNumber,
    createdAt: types.Date,
    messages: types.array(MessageModel),
    name: types.string,
    type: types.string,
    prettyName: types.string, // ???
    user1id: types.maybeNull(types.number),
    user2id: types.maybeNull(types.number),
  })
  .actions((self) => ({
    addMessage(message: Message) {
      self.messages.push(message)
    },
    setMessages(messages: any) {
      self.messages = messages
    },
  }))
  .views((self) => ({
    get driverMessages(): Message[] {
      const root = getRoot(self) as RootStore
      const uid = root.authStore.id

      return toJS(self.messages).filter(
        (message: Message) =>
          message.player?.profession !== 'Rider' && message.userId !== uid
      )
    },
  }))

export interface Chatroom extends Instance<typeof ChatroomModel> {}
export interface Message extends Instance<typeof MessageModel> {}
