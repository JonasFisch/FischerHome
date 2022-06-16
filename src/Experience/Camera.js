import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience";

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.cursor = this.experience.cursor
        this.time = this.experience.time
        this.debug = this.experience.debug

        if (this.debug.active) this.debugFolder = this.debug.ui.addFolder("camera")

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        // Camera Group
        this.cameraGroup = new THREE.Group()
        this.scene.add(this.cameraGroup)

        // Base Camera
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1, 
            100
        )
        this.instance.position.set(-19, 12, 20)
        if (this.debug.active) {
            this.debugFolder
                .add(this.instance.position, "x")
                .name("positionX")
                .min(-20)
                .max(20)
                .step(0.001)

            this.debugFolder
                .add(this.instance.position, "y")
                .name("positionY")
                .min(-20)
                .max(20)
                .step(0.001)

            this.debugFolder
                .add(this.instance.position, "z")
                .name("positionZ")
                .min(-20)
                .max(20)
                .step(0.001)  
        }
        console.log(this.instance);
        this.cameraGroup.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
        // const parallaxX = this.cursor.x * 2
        // const parallaxY = - this.cursor.y * 2

        // this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 0.15 * (this.time.delta / 100)
        // this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 0.15 * (this.time.delta / 100)
    }
}