import React from 'react'
import { ChannelList } from '@arcadecity/ui'

export default function () {
  return (
    <div className='h-screen w-screen bg-haiti flex text-moonraker'>
      {/* Sidebar */}
      <div
        className={`w-full md:!w-[350px] border-minsk h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r`}
      >
        <ChannelList />
      </div>

      <div className='flex h-screen flex-grow flex-col items-stretch bg-purple'></div>
    </div>
  )
}
