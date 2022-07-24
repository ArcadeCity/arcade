import Realgame from 'realgame/Realgame'

export class UI {
    parent: Realgame | null

    constructor() {
        this.parent = null
    }

    setParent(p: Realgame) {
        this.parent = p
    }

    hideOverlay() {
        const overlay = document.getElementById('overlay')
        const loader = document.getElementById('loader')
        loader.style.display = 'none'
        overlay.classList.add('our-hidden')
    }
}
