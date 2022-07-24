import React from 'react'
import ReactDOM from 'react-dom'

import { Hud } from './Hud'

export const renderHud = () => {
    const hudElement = document.getElementById('hud')
    if (hudElement) {
        // hudElement.classList.remove('pointer-events-none')
        ReactDOM.render(<Hud />, hudElement)
    } else {
        throw 'No HUD element'
    }
}
