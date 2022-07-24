import React from 'react'

export const HUDAvatar = () => {
    return (
        <div className='absolute h-screen w-screen flex flex-col justify-start items-center'>
            <div className='mt-10 pointer-events-auto w-full p-4'>
                <img
                    src='img/me.jpg'
                    className='rounded-full border-cyan-500 border-2 h-16 w-16 shadow-xl shadow-cyan-800/50'
                />
            </div>
        </div>
    )
}
