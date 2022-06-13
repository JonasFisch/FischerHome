import Experience from "../Experience"
import Environment from "./Environment"
import Floor from "./Floor"
import Fox from "./Fox"
import PointOfInterest from "./PointOfInterest"
import * as THREE from "three"
import Room from "./Room"
 

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        // wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.room = new Room()
            this.environment = new Environment() // needs to be called last for updating Materials responding to env Map
            this.pointOfInterest1 = new PointOfInterest(new THREE.Vector3(1.55, 0.3, - 0.6), 0, "lorem ipsum")
            this.pointOfInterest2 = new PointOfInterest(new THREE.Vector3(-1, 0.3, - 0.6), 1, "wdwafwaww")
            
            this.pointOfInterest1.element.addEventListener("click", () => {
                this.room.toggleLight("Lichterkette")
            })

            this.pointOfInterest2.element.addEventListener("click", () => {
               this.room.toggleLight("Schreibtischlampen")
            })
        })
    }

    update() {
        if (this.fox) this.fox.update()   
        if (this.pointOfInterest1) this.pointOfInterest1.update()
        if (this.pointOfInterest2) this.pointOfInterest2.update()
    }
}