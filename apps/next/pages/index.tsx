import React from 'react'
import { ChannelList } from '@arcadecity/ui'
import { Channel, useArcadeRelay, useChannelsCreated } from '@arcadecity/use-arcade'

export default function () {
  useArcadeRelay()
  const channels: Channel[] = useChannelsCreated()
  return (
    <div className='h-screen w-screen bg-haiti flex text-moonraker'>
      {/* Sidebar */}
      <div
        className={`w-full md:!w-[350px] border-minsk h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r`}>
        <ChannelList channels={channels} />
      </div>

      <div className='flex h-screen flex-grow flex-col items-stretch bg-purple'></div>
    </div>
  )
}
