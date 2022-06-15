import Experience from "../Experience";
import * as THREE from 'three'
import gsap from "gsap"
import PointOfInterest from "./PointOfInterest";

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.lights = []
        this.resource = this.resources.items.roomModel
        this.pointsOfInterest = []

        this.setModel()
        window.setTimeout(() => {
            this.turnOffLight()
        }, 2000)


        // this.pointOfInterest1 = new PointOfInterest(new THREE.Vector3(1.55, 0.3, - 0.6), 0, "lorem ipsum")
        // this.pointOfInterest2 = new PointOfInterest(new THREE.Vector3(-1, 0.3, - 0.6), 1, "wdwafwaww")
        
        // this.pointOfInterest1.element.addEventListener("click", () => {
        //     this.toggleLight("Lichterkette")
        // })

        // this.pointOfInterest2.element.addEventListener("click", () => {
        //    this.toggleLight("Schreibtischlampen")
        // })
    }

    addPointOfInterest(light) {
        const newPointOfinterest = new PointOfInterest(light.parent.position, 1, light.name)
        newPointOfinterest.element.addEventListener("click", () => this.toggle(light))
        this.pointsOfInterest.push(newPointOfinterest)
    }

    toggle(light) {
        if (light.intensity === 0) gsap.to(light, {intensity: 400, duration: 0.8})
        else gsap.to(light, {intensity: 0, duration: 0.8})
    }


    turnOffLight() {
        for (const light of this.lights) {
            console.log(light.intensity);
            gsap.to(light, {intensity: 0, duration: 0.8})
        }
    }

    turnOnLight() {
        for (const light of this.lights) {
            gsap.to(light, {intensity: 800, duration: 0.8})
        }
    }

    // toggleLight(name) {
    //     for (const light of this.lights) {
    //         console.log(light);
    //         if (light.name === `${name}_Orientation`) {
    //             if (light.intensity === 0) gsap.to(light, {intensity: 400, duration: 0.8})
    //             else gsap.to(light, {intensity: 0, duration: 0.8})
    //         } else {
    //             console.log("cant find light with that name!");
    //         }
    //     }
    // }

    setModel() {
        this.model = this.resource.scene
        this.scene.add(this.model)

        this.model.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.receiveShadow = true
                child.castShadow = true
            }
            if (child instanceof THREE.PointLight) {
                child.castShadow = true
                child.shadow.normalBias = 0.05
                child.shadow.mapSize.set(1024, 1024)
                child.shadow.camera.far = 10
                this.addPointOfInterest(child) 
                // const helper = new THREE.CameraHelper(child.shadow.camera)
                // this.scene.add(helper)
                this.lights.push(child)
            } 
        })
    }

    update() {
        for (const pointOfInterest of this.pointsOfInterest) {
            pointOfInterest.update()            
        }
        // if (this.pointOfInterest1) this.pointOfInterest1.update()
        // if (this.pointOfInterest2) this.pointOfInterest2.update()
    }
}