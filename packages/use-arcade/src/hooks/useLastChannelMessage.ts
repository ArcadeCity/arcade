import { Message, store } from '../store'
import { useChannelMessages } from './useChannelMessages'

export const useLastChannelMessage: (channelId: string) => Message = (channelId: string) => {
  const messages = useChannelMessages(channelId)
  const lastMessage = messages[messages.length - 1]
  // if (!store.lastMessages[channelId]) {
  //   store.lastMessages[channelId] = lastMessage
  // }
  return lastMessage
}
