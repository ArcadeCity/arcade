import { RootStackScreenProps } from '../types'

export const ChannelScreen = ({ route }: RootStackScreenProps<'channel'>) => {
  const channelId = route.params.channelId
  console.log(channelId)
  return <></>
}
