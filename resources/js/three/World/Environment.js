import Experience from "../Experience"
import * as THREE from "three"
import gsap from "gsap"

export default class Environment {

    static sunLightColor = new THREE.Color("#ffffff")
    static moonLightColor = new THREE.Color("#6d72fd")

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time

        // Debug
        if(this.debug.active) {
            const debugObject = {
                setSunLight: () => {
                    this.setSunLight()
                },
                setMoonLight: () => {
                    this.setMoonLight()
                }
            }

            this.debugFolder = this.debug.ui.addFolder("environment")
            this.debugFolder.add(debugObject, "setSunLight")
            this.debugFolder.add(debugObject, "setMoonLight")
        }

        // Set Environment
        this.setEnvironmentLight()
        this.setEnvironmentMap()

        // set type of light
        if (this.time.isDay) this.setSunLight()
        else this.setMoonLight()

        // register Events
        this.time.on("night", () => {
            this.setMoonLight()
        })
    }

    setSunLight() {
        this.environmentLight.intensity = 4
        gsap.to(this.environmentLight.color, {
            r: Environment.sunLightColor.r,
            g: Environment.sunLightColor.g,
            b: Environment.sunLightColor.b,
            duration: 1
        })
    }

    setMoonLight() {
        this.environmentLight.intensity = 2.7
        gsap.to(this.environmentLight.color, {
            r: Environment.moonLightColor.r,
            g: Environment.moonLightColor.g,
            b: Environment.moonLightColor.b,
            duration: 1
        })
    }

    setEnvironmentLight() {
        this.environmentLight = new THREE.DirectionalLight('#ffffff', 4)
        this.environmentLight.position.set(2.3, 2.787, - 0.409)

        // shadow settings
        this.environmentLight.castShadow = true
        this.environmentLight.shadow.camera.far = 8
        this.environmentLight.shadow.mapSize.set(4096, 4096)
        this.environmentLight.shadow.radius = 15
        this.environmentLight.shadow.normalBias = 0.05
        this.environmentLight.shadow.camera.top = 3.4
        this.environmentLight.shadow.camera.right = 2.1
        this.environmentLight.shadow.camera.bottom = -1.2
        this.environmentLight.shadow.camera.left = -2.3

        // set helper
        if (this.debug.active) {
            const cameraHelper = new THREE.CameraHelper(this.environmentLight.shadow.camera)
            this.scene.add(cameraHelper)
        }

        // add to scene
        this.scene.add(this.environmentLight)

        if(this.debug.active) {
            this.debugFolder
                .add(this.environmentLight, "intensity")
                .name("sunLightIntensity")
                .min(0)
                .max(10)
                .step(0.001)

            this.debugFolder
                .add(this.environmentLight.position, "x")
                .name("sunLightX")
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.environmentLight.position, "y")
                .name("sunLightY")
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.environmentLight.position, "z")
                .name("sunLightZ")
                .min(-5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.environmentLight.shadow.camera, "far")
                .name("far")
                .min(0)
                .max(20)
                .step(0.001)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })
            this.debugFolder
                .add(this.environmentLight.shadow, "radius")
                .name("radius")
                .min(0)
                .max(100)
                .step(0.001)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })
            this.debugFolder
                .add(this.environmentLight.shadow, "blurSamples")
                .name("blurSamples")
                .min(0)
                .max(20)
                .step(2)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })

            this.debugFolder
                .add(this.environmentLight.shadow.camera, "left")
                .name("left")
                .min(-5)
                .max(5)
                .step(0.01)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })

            this.debugFolder
                .add(this.environmentLight.shadow.camera, "right")
                .name("right")
                .min(-5)
                .max(5)
                .step(0.01)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })
            this.debugFolder
                .add(this.environmentLight.shadow.camera, "top")
                .name("top")
                .min(-5)
                .max(5)
                .step(0.01)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })

            this.debugFolder
                .add(this.environmentLight.shadow.camera, "bottom")
                .name("bottom")
                .min(-5)
                .max(5)
                .step(0.01)
                .onFinishChange(() => {
                    this.environmentLight.shadow.camera.updateProjectionMatrix()
                    cameraHelper.update()
                })

            this.debugFolder.addColor(this.environmentLight, "color")
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture
        this.scene.environment.encoding = this.environmentMap.encoding

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, "intensity")
                .name("envMapIntensity")
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}
