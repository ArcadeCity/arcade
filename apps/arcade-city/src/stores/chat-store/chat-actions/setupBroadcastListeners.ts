import { display } from 'lib'
import {
    ApiChatroom, ApiMessage, ApiPlayer, ApiServiceRequest, getOrCreateChatroom,
    normalizeApiChatroom, normalizeApiMessage, normalizeApiPlayer,
    normalizeApiServiceRequest, saveServiceRequest
} from 'services/api'
import { Chatroom, ChatStore, Message } from 'stores/chat-store'
import { Player } from 'stores/player-store'
import { ServiceRequest } from 'stores/service-store'

export const setupBroadcastListeners = async (self: ChatStore) => {
  const token = self.rootStore.authStore.tokens.api
  if (!token) throw 'No token'
  await self.env.broadcasting.setupClient(token)
  const echo = self.env.broadcasting.echo
  const id = self.rootStore.authStore.player?.id.toString()

  echo
    .private(`user.${id}`)

    .listen('ServiceRequestJoined', async (e: any) => {
      const apiSR: ApiServiceRequest = e.service_request
      saveServiceRequest(self, apiSR)
    })

    // TODO: See if saveServiceRequest works also for updated
    .listen('ServiceRequestUpdated', async (e: any) => {
      display({
        name: 'Echo',
        preview: 'ServiceRequestUpdated',
        value: e,
        important: true,
      })
      const apiSR: ApiServiceRequest = e.service_request

      // Ensure players exist.
      const apiPlayer: ApiPlayer = e.requesting_user
      const player: Player = normalizeApiPlayer(apiPlayer)
      self.rootStore.playerStore.setPlayer(player)

      const serviceRequest: ServiceRequest = normalizeApiServiceRequest(apiSR)
      self.rootStore.serviceStore.setRequest(serviceRequest)
    })

    .listen('ChatroomJoined', async (e: any) => {
      // Normalize chatroom object and save to store.
      const apiChatroom: ApiChatroom = e.chatroom
      const chatroom: Chatroom = normalizeApiChatroom(apiChatroom)
      self.rootStore.chatStore.setChatroom(chatroom)
    })

    .listen('App\\Events\\MessageCreated', async (e: any) => {
      console.log('THIS IS WHAT?!!!!')
    })

    .listen('AppEventsMessageCreated', async (e: any) => {
      console.log('THIS IS WHAT?')
    })

    .listen('.MessageCreated', async (e: any) => {
      console.log('THIS IS WHAT? ! ! ! ! ! !')
    })

    .listen(`MessageCreated`, async (e: any) => {
      display({
        name: 'MessageCreated',
        preview: 'Received message broadcast',
        value: e,
      })

      const apiMessage: ApiMessage = e.message

      // Ensure player exists. Okay to overwrite.
      const apiPlayer: ApiPlayer = apiMessage.user
      const player: Player = normalizeApiPlayer(apiPlayer)
      self.rootStore.playerStore.setPlayer(player)

      // Ensure chatroom exists. Don't overwrite.
      const apiChatroom: ApiChatroom = apiMessage.chatroom
      const chatroom: Chatroom = getOrCreateChatroom(self, apiChatroom)
      if (!self.chatrooms) return
      if (!self.chatrooms.has(chatroom.id.toString())) {
        self.rootStore.chatStore.setChatroom(chatroom)
      }

      // Save message.
      const message: Message = normalizeApiMessage(apiMessage)
      chatroom.addMessage(message)
    })

  // display({
  //   name: 'setupBroadcastListeners',
  //   preview: `Set up broadcast listeners`,
  // })

  return true
}
