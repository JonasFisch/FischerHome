import Experience from "../Experience"
import Environment from "./Environment"
import Room from "./Room"
import * as THREE from "three"


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.cursor = this.experience.cursor

        // wait for resources
        this.resources.on('ready', () => {
            // Setup
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
