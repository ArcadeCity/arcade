import { Channel } from '../store'
import { useChannelsCreated } from './useChannelsCreated'

export const useChannel: (channelId: string) => Channel = (channelId: string) => {
  const channels = useChannelsCreated()
  return channels.find((channel) => channel.id === channelId) as Channel
}
