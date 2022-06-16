import Experience from "../Experience"
import Environment from "./Environment"
import Floor from "./Floor"
import Fox from "./Fox"
import Room from "./Room"
 

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // wait for resources
        this.resources.on('ready', () => {
            // Setup
            // this.floor = new Floor()
            // this.fox = new Fox()
            this.room = new Room()
            this.environment = new Environment() // needs to be called last for updating Materials responding to env Map
        })
    }

    update() {
        if (this.fox) this.fox.update()   
        if (this.room) this.room.update()
    }
}