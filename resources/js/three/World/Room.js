import Experience from "../Experience";
import * as THREE from 'three'
import gsap from "gsap"
import PointOfInterest from "./PointOfInterest";
import DeviceUtils from "../../util/DeviceUtils";

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.resource = this.resources.items.roomModel

        // storages
        this.lights = []
        this.pointsOfInterest = []

        // get device control
        this.deviceUtils = new DeviceUtils()

        // init model
        this.setModel()

        // register websocket event handler
        this.deviceUtils.laravelEcho.channel("device-channel")
            .listen("DeviceUpdatedEvent", event => {
                const light = this.lights.find(light => light.name === event.device.objectName)
                if (light) this.toggle(light)
            })
    }

    addPointOfInterest(light, device) {
        const newPointOfinterest = new PointOfInterest(light.parent.position, light.name, 1500)
        newPointOfinterest.element.addEventListener("click", async () =>  {
            if (device) {
                if (light.intensity > 0) await this.deviceUtils.changeDeviceState(device.id, 0)
                else await this.deviceUtils.changeDeviceState(device.id, 1)
            } else console.warn(`light ${light.name} is not connected to a SmartHome Device!`)
        })
        this.pointsOfInterest.push(newPointOfinterest)
    }

    toggle(light) {
        if (light.intensity === 0) gsap.to(light, {intensity: 400, duration: 0.8})
        else gsap.to(light, {intensity: 0, duration: 0.8})
    }

    setModel() {
        this.model = this.resource.scene
        const SCALE = 0.009
        this.model.scale.set(SCALE, SCALE, SCALE)
        this.scene.add(this.model)

        this.model.traverse(child => {
            if (child instanceof THREE.Mesh) this.setupMesh(child)
            if (child instanceof THREE.PointLight) this.setupLight(child)
        })
    }

    setupMesh(mesh) {
        mesh.receiveShadow = true
        mesh.castShadow = true
    }

    setupLight(light) {
        // shadow settings
        light.castShadow = true
        light.shadow.normalBias = 0.05
        light.shadow.mapSize.set(1024, 1024)
        light.shadow.camera.far = 10

        // set inital device state
        const device = this.deviceUtils.mapping[light.name]
        if (device) light.intensity = device.state * 400
        else light.intensity = 0

        // add point of interest
        this.addPointOfInterest(light, device)
        this.lights.push(light)
    }

    update() {
        for (const pointOfInterest of this.pointsOfInterest) pointOfInterest.update()
    }
}

