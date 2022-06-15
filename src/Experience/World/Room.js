import Experience from "../Experience";
import * as THREE from 'three'
import gsap from "gsap"

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.lights = []
        this.resource = this.resources.items.roomModel

        this.setModel()
        window.setTimeout(() => {
            this.turnOffLight()
        }, 2000)
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

    toggleLight(name) {
        for (const light of this.lights) {
            console.log(light);
            if (light.name === `${name}_Orientation`) {
                if (light.intensity === 0) gsap.to(light, {intensity: 400, duration: 0.8})
                else gsap.to(light, {intensity: 0, duration: 0.8})
            } else {
                console.log("cant find light with that name!");
            }
        }
    }

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
                console.log(child.shadow.camera);
                child.shadow.camera.far = 10
                const helper = new THREE.CameraHelper(child.shadow.camera)
                this.scene.add(helper)
                this.lights.push(child)
                // TODO: camera settings for performance optimization
            } 
        })
    }
}