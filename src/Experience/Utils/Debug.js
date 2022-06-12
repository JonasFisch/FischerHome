import * as dat from "lil-gui"
import Stats from "stats.js"

export default class Debug {
    constructor() {
        this.active = window.location.hash === '#debug'

        if (this.active) this.ui = new dat.GUI()
        
        // fps panel
        if (this.active) {
            this.stats = new Stats()
            this.stats.showPanel( 0 )
            document.body.appendChild(this.stats.dom)
        }
    }

    beforeUpdate() {
        if (this.active) this.stats.begin()
    }

    afterUpdate() {
        if (this.active) this.stats.end()
    }

}