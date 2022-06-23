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

        // PLAYGROUND
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.scene.add( this.mesh );
    }

    update() {
        if (this.fox) this.fox.update()
        if (this.room) this.room.update()

        // playground

        const START_ROTATION = Math.PI * (7/4)
        const rotationPoint = new THREE.Vector3(0, 0, 0)
        this.mesh.position.x = rotationPoint.x + Math.cos(START_ROTATION + Math.PI * this.cursor.x * -1) //* (this.time.delta / 100)
        this.mesh.position.z = rotationPoint.z + Math.sin(START_ROTATION + Math.PI * this.cursor.x * -1)//* (this.time.delta / 100)

    }
}
