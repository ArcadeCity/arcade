import React from 'react'

import { Button, FrameCorners, FrameHexagon, Text } from '@arwes/core'

export const DemoRideRequest = () => {
    const [show, setShow] = React.useState(false)
    const [activate, setActivate] = React.useState(false)

    const waitFor = 12000

    React.useEffect(() => {
        const timeout = setTimeout(() => setShow(true), waitFor)
        return () => clearTimeout(timeout)
    }, [show])

    React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), waitFor)
        return () => clearTimeout(timeout)
    }, [activate])

    if (!show) return null
    return (
        // @ts-ignore
        <FrameCorners
            animator={{ animate: false }}
            showContentLines
            contentLineWidth={1}
            className='w-full mt-6 mb-12 max-w-xl pointer-events-auto shadow-xl shadow-cyan-800/50'
        >
            {activate && (
                <div className='pt-4 md:pt-0 m-4 md:m-12'>
                    <h1 className='text-center'>NEW RIDE REQUEST</h1>

                    <hr />

                    <blockquote className='mb-4'>
                        hey i need a ride from Hotel Satoshi to Joes BBQ - can
                        pay sats or cuckbucks
                    </blockquote>

                    <p className='text-center mt-4'>
                        Rate: <a href='#'>2500 sats/min</a>{' '}
                    </p>

                    <p className='text-center'>
                        Pickup: <a href='#'>0.5 miles NW</a>{' '}
                    </p>

                    <p className='text-center'>
                        Dropoff: <a href='#'>1.2 miles SE</a>{' '}
                    </p>

                    <div className='mt-6 md:mt-12 mb-8 w-full flex flex-col md:flex-row justify-evenly items-center'>
                        {/* @ts-ignore */}
                        <Button
                            animator={{ activate }}
                            onClick={(event) => console.log(event)}
                            FrameComponent={FrameHexagon}
                            className='mb-8 md:mb-0'
                        >
                            {/* @ts-ignore */}
                            <Text className='pt-2 text-3xl tracking-widest'>
                                Accept
                            </Text>
                        </Button>

                        {/* @ts-ignore */}
                        <Button
                            animator={{ activate }}
                            onClick={(event) => console.log(event)}
                            FrameComponent={FrameHexagon}
                            palette='secondary'
                        >
                            {/* @ts-ignore */}
                            <Text className='pt-1 text-xl tracking-widest'>
                                Ignore
                            </Text>
                        </Button>
                    </div>
                </div>
            )}
        </FrameCorners>
    )
}
