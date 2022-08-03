import { Message } from '../store'
import { useChannelMessages } from './useChannelMessages'

export const useLastChannelMessage: (channelId: string) => Message = (channelId: string) => {
  const messages = useChannelMessages(channelId)
  return messages[messages.length - 1]
}
