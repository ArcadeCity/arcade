import React from 'react'

import { ArwesThemeProvider, LoadingBars } from '@arwes/core'

export const LoaderStandalone = () => {
    return (
        <ArwesThemeProvider>
            <LoadingBars animator={{ animate: false }} />
        </ArwesThemeProvider>
    )
}
