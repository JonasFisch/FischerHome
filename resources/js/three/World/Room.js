import Experience from "../Experience";
import * as THREE from 'three'
import gsap from "gsap"
import PointOfInterest from "./PointOfInterest";
import DeviceUtils from "../../util/DeviceUtils";

const LIGHT_INTENSITY = 5

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
                console.log(event);
                if (light) {
                    switch (event.device.state) {
                        case 0:
                            this.lightOff(light)
                            break;
                        case 1:
                            this.lightOn(light)
                            break;
                        default:
                            console.warn("invalid device state! returned by server!");
                            break;
                    }
                }
            })
    }

    addPointOfInterest(light, device) {
        console.log("lightposition: ", light.position);
        const newPointOfinterest = new PointOfInterest(light.parent.position, light.name, 1500)
        newPointOfinterest.element.addEventListener("click", async () =>  {
            if (device) {
                if (light.intensity > 0) {
                    await this.deviceUtils.changeDeviceState(device.id, 0)
                    this.lightOff(light)
                }
                else {
                    await this.deviceUtils.changeDeviceState(device.id, 1)
                    this.lightOn(light)
                }
            } else console.warn(`light ${light.name} is not connected to a SmartHome Device!`)
        })
        this.pointsOfInterest.push(newPointOfinterest)
    }

    toggle(light) {
        if (light.intensity === 0) this.lightOn(light)
        else this.lightOff(light)
    }

    lightOn(light) {
        gsap.to(light, {intensity: LIGHT_INTENSITY, duration: 0.8})
    }

    lightOff(light) {
        gsap.to(light, {intensity: 0, duration: 0.8})
    }

    setModel() {
        this.model = this.resource.scene
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
        if (device) {
            light.intensity = device.state * LIGHT_INTENSITY

            // add point of interest
            this.addPointOfInterest(light, device)
            this.lights.push(light)
        } else {
            light.intensity = 0
        }
    }

    update() {
        for (const pointOfInterest of this.pointsOfInterest) pointOfInterest.update()
    }
}

