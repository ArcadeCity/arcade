import { Message, useActiveChannelId, useChannelMessages } from '@arcadecity/use-arcade'
import React from 'react'
import { MessageInput } from './MessageInput'

export const ChannelView = () => {
  const activeChannelId = useActiveChannelId() as string
  const messages: Message[] = useChannelMessages(activeChannelId)
  console.log(activeChannelId, messages.length)

  if (!activeChannelId) return <></>

  return (
    <div className='flex h-screen flex-grow flex-col items-stretch bg-haiti'>
      <div className='border-dark-lighten flex h-20 items-center justify-between border-b px-5'>
        {/* <p>Channel title</p> */}
      </div>
      <div className='flex flex-grow flex-col items-stretch gap-3 pt-10 pb-1 bg-purple w-full'>
        <p></p>
      </div>
      <div className='border-dark-lighten flex h-24 items-stretch gap-1 border-t w-full'>
        <MessageInput />
        {/* <form className='flex flex-grow items-stretch gap-1'>
          <div className='relative flex flex-grow items-center'>
            <input
              maxLength={1000}
              className='h-9 w-full rounded-full pl-3 pr-10 outline-none'
              style={{
                backgroundColor: '#2D2252',
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 15,
                paddingBottom: 15,
              }}
              type='text'
              placeholder='Message...'
            />
            <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2'>
              <i className='bx bxs-smile text-primary text-2xl'></i>
            </button>
          </div>

          <button className='text-primary flex flex-shrink-0 items-center text-2xl'>
            <i className='bx bxs-send'></i>
          </button>
        </form> */}
      </div>
    </div>
  )
}
