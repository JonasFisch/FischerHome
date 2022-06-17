import Experience from "../Experience";
import EventEmitter from "./EventEmitter";


export default class Cursor extends EventEmitter {
    constructor() {
        super()
        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.x = 0
        this.y = 0

        window.addEventListener("mousemove", event => {
            this.x = event.clientX / this.sizes.width - 0.5
            this.y = event.clientY / this.sizes.height - 0.5
        })
    }
}