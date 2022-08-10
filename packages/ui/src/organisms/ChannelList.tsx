import React from 'react'
import { Text } from 'dripsy'
import { palette } from '../theme'
import { Channel } from '@arcadecity/use-arcade'

interface ChannelListProps {
  channels: Channel[]
}

export const ChannelList = ({ channels }: ChannelListProps) => {
  const numChannels = channels?.length ?? 0
  return (
    <Text sx={{ color: palette.moonRaker, textAlign: 'center', mb: 16, fontWeight: 'bold' }}>
      {numChannels} channels
    </Text>
  )
}
