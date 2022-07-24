import React from 'react'

import { Animator, AnimatorGeneralProvider } from '@arwes/animation'
import {
    ArwesThemeProvider, FrameCorners, LoadingBars, StylesBaseline, Text
} from '@arwes/core'

const animatorGeneral = { duration: { enter: 200, exit: 200 } }
const FONT_FAMILY_ROOT = '"Eurostile", sans-serif'
const FONT_FAMILY_CODE = '"Source Code Pro", monospace'

export const Hud = () => {
    const [activate, setActivate] = React.useState(false)

    React.useEffect(() => {
        const timeout = setTimeout(() => setActivate(true), 3000)
        // const timeout = setTimeout(() => setActivate(!activate), 2000)
        return () => clearTimeout(timeout)
    }, [activate])
    return (
        <div className='flex flex-col justify-center items-center absolute w-screen h-screen overflow-none'>
            {/* @ts-ignore */}
            <ArwesThemeProvider>
                <StylesBaseline
                    styles={{
                        'html, body': {
                            fontFamily: FONT_FAMILY_ROOT,
                            letterSpacing: 2,
                        },
                        'h1, h2, h3': {
                            letterSpacing: 5,
                        },
                        'code, pre': { fontFamily: FONT_FAMILY_CODE },
                    }}
                />
                <div className='w-full py-16 px-16 mx-auto'>
                    <AnimatorGeneralProvider animator={animatorGeneral}>
                        <div className='mb-12 w-full flex flex-col justify-center items-center'>
                            <Animator
                                animator={{
                                    activate,
                                    manager: 'sequence',
                                    combine: true,
                                    duration: { stagger: 50 },
                                }}
                            >
                                {/* @ts-ignore */}
                                {/* <Text as='h2'>WELCOME</Text> */}

                                {/* @ts-ignore */}
                                <FrameCorners
                                    animator={{ activate }}
                                    // hover
                                    showContentLines
                                    contentLineWidth={1}
                                    className='w-full mb-12 max-w-xl'
                                >
                                    {activate && (
                                        <div className='m-12'>
                                            <h1 className='text-center'>
                                                WITHDRAW BITCOIN
                                            </h1>

                                            <hr />

                                            <p className='text-center'>
                                                Balance:{' '}
                                                <a href='#'>100 sats</a>{' '}
                                            </p>

                                            <blockquote>
                                                Scan the QR code with your
                                                mobile Lightning wallet.{' '}
                                                <a href='#'>[Need a wallet?]</a>
                                                <br />
                                                <br />
                                                All 100 sats will be withdrawn
                                                to your wallet immediately.{' '}
                                                <a href='#'>[How?]</a>
                                            </blockquote>

                                            <div className='mt-12 mb-12 flex flex-col justify-center items-center'>
                                                {/* @ts-ignore */}
                                                <FrameCorners
                                                    animator={{ activate }}
                                                    // hover
                                                    // showContentLines
                                                    contentLineWidth={1}
                                                    cornerWidth={100}
                                                >
                                                    <div id='qrcode'></div>
                                                </FrameCorners>
                                            </div>
                                        </div>
                                    )}
                                </FrameCorners>

                                {/* @ts-ignore */}
                                {/* <Text as='p'>
                                    Nemo enim ipsam voluptatem quia voluptas sit
                                    aspernatur aut odit aut fugit, sed quia
                                    consequuntur magni dolores eos qui ratione
                                    voluptatem sequi nesciunt. Neque porro
                                    quisquam est, qui d
                                </Text> */}
                            </Animator>
                        </div>
                    </AnimatorGeneralProvider>
                </div>
            </ArwesThemeProvider>
        </div>
    )
}
