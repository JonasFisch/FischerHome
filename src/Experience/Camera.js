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
        this.instance.position.set(0, 0, 6)
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

        // const parallaxX = this.cursor.x * 0.5
        // const parallaxY = - this.cursor.y * 0.5

        // this.cameraGroup.position.x += (parallaxX - this.cameraGroup.position.x) * 0.15 * (this.time.delta / 100)
        // this.cameraGroup.position.y += (parallaxY - this.cameraGroup.position.y) * 0.15 * (this.time.delta / 100)
    }
}