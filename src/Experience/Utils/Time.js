import EventEmitter from "./EventEmitter"

export default class Time extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16 // 0 will cause some bugs ...

        // Day Status
        const hours = new Date(this.start).getHours()
        this.isDay = hours > 7 && hours < 19

        // ticks
        this.longerTick()
        window.requestAnimationFrame(() => this.tick())
    }

    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    longerTick() {
        setTimeout(() => {    
            // this.trigger('night')
            // console.log("tick15Minutes");
            this.longerTick()
        }, 1000);
    }
}