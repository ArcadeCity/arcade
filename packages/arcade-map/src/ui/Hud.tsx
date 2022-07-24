import React from 'react'

import { Animator, AnimatorGeneralProvider } from '@arwes/animation'
import {
    ArwesThemeProvider, Button, FrameCorners, FrameHexagon, LoadingBars,
    StylesBaseline, Text
} from '@arwes/core'

import { DemoRideRequest } from './DemoRideRequest'
import { HUDAvatar } from './HUDAvatar'
import { HUDButtons } from './HUDButtons'
import { baselineStyles } from './styles'

const animatorGeneral = { duration: { enter: 200, exit: 200 } }

export const Hud = () => {
    const [activate, setActivate] = React.useState(false)
    React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), 3000)
        return () => clearTimeout(timeout)
    }, [activate])
    return (
        <div className='flex flex-col justify-center items-center absolute w-screen h-screen overflow-none pointer-events-none'>
            {/* @ts-ignore */}
            <ArwesThemeProvider>
                <StylesBaseline styles={baselineStyles} />
                <div className='w-full p-4 md:py-16 md:px-16 mx-auto'>
                    <AnimatorGeneralProvider animator={animatorGeneral}>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <Animator
                                animator={{
                                    activate,
                                    manager: 'sequence',
                                    combine: true,
                                    duration: { stagger: 50 },
                                }}
                            >
                                <DemoRideRequest />
                                <HUDAvatar />
                                <HUDButtons activate={activate} />
                            </Animator>
                        </div>
                    </AnimatorGeneralProvider>
                </div>
            </ArwesThemeProvider>
        </div>
    )
}
