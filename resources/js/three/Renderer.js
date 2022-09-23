import * as THREE from "three"
import Experience from "./Experience"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

export default class Renderer {
    constructor() {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
        // this.setPostProcessing()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            powerPreference: 'high-performance',
            antialias: true,
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.ReinhardToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFShadowMap
        this.instance.shadowMap.autoUpdate = false
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setPostProcessing() {
        this.effectComposer = new EffectComposer(this.instance)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // init render passes
        const renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(renderPass)
        const ssaaPass = new SMAAPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(ssaaPass)

        // always should be last pass
        const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
        this.effectComposer.addPass(gammaCorrectionPass)

    }
    resize() {
        // update renderer
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        // Update effect composer
        // this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        // this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
        // this.effectComposer.render()
    }
}
