import React from 'react'
import { ChannelList } from '@arcadecity/ui'
import { Channel, useNostr, useChannelsCreated } from '@arcadecity/use-arcade'

export default function () {
  useNostr()
  const channels: Channel[] = useChannelsCreated()
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <ChannelList channels={channels} />
      </div>
      <div className={styles.main}></div>
    </div>
  )
}

const styles = {
  container: 'h-screen w-screen bg-haiti flex text-moonraker',
  sidebar:
    'scrollbar w-full md:!w-[350px] h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden',
  main: 'flex h-screen flex-grow flex-col items-stretch bg-haiti',
}
