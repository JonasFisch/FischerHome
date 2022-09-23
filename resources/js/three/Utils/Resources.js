import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'


import EventEmitter from "./EventEmitter"
import * as THREE from "three"

let startTime = null
let endTime = null

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        // Options
        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.errorOccured = false

        startTime = Date.now()

        this.setLoadingManager()
        this.setLoaders()
        this.startLoading()
    }

    setLoadingManager() {
        const loadingWrapperElement = document.querySelector(".loading-wrapper")
        const loadingProgressElement = document.querySelector(".progress")
        this.loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                if (!this.errorOccured) window.setTimeout(() => {
                    loadingWrapperElement.classList.add("ended")
                }, 1000)
            },

            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                const progressRatioPercentage = Math.floor((itemsLoaded / itemsTotal) * 100)
                loadingProgressElement.style.transform = `translateX(${progressRatioPercentage}%)`
            },

            // Error
            () => {
                this.errorOccured = true
                loadingWrapperElement.classList.add("error")
            }
        )
    }

    setLoaders() {



        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.fBXLoader = new FBXLoader(this.loadingManager)
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
    }

    /**
     * Loads all sources
     */
    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case "gltfModel":
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file) => this.sourceLoaded(source, file)
                    )
                    break
                case "texture":
                    this.loaders.textureLoader.load(
                        source.path,
                        (file) => this.sourceLoaded(source, file)
                    )
                    break
                case "cubeTexture":
                    this.loaders.cubeTextureLoader.load(
                        source.path,
                        (file) => this.sourceLoaded(source, file)
                    )
                    break
                case "fbxModel":
                    this.loaders.fBXLoader.load(
                        source.path,
                        (file) => this.sourceLoaded(source, file)
                    )
                    break
                default:
                    break
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded === this.toLoad) {
            this.trigger('ready')
            endTime = Date.now()
            console.log(endTime - startTime);
        }
    }
}
