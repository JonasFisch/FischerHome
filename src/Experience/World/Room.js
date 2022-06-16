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
    }

    addPointOfInterest(light) {
        const newPointOfinterest = new PointOfInterest(light.parent.position, light.name, 1500)
        newPointOfinterest.element.addEventListener("click", () => this.toggle(light))
        this.pointsOfInterest.push(newPointOfinterest)
    }

    toggle(light) {
        if (light.intensity === 0) gsap.to(light, {intensity: 400, duration: 0.8})
        else gsap.to(light, {intensity: 0, duration: 0.8})
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
                child.shadow.camera.far = 10
                this.addPointOfInterest(child) 
                // const helper = new THREE.CameraHelper(child.shadow.camera)
                // this.scene.add(helper)
                child.intensity = 0
                this.lights.push(child)
            } 
        })
    }

    update() {
        for (const pointOfInterest of this.pointsOfInterest) {
            pointOfInterest.update()            
        }
    }
}