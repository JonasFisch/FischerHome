<template>
    <div class="render-canvas">
        <Renderer ref="renderer" height="1000" width="900" :antialias="true" :pointer="{ intersectRecursive: true }" orbitCtrl shadow>
            <Camera :position="{ z: 10, x: 5, y: 3 }" :lookAt="{ z: 0, x: 0, y: 0}" ref="camera" />
            <Raycaster
                intersect-recursive
                @click="onPointerEvent"
            />
            <Scene background="#ffffff">

                <AmbientLight color="#ffffff" :intensity="0.5"></AmbientLight>
                <PointLight v-for="light in lights" :key="light.name" :ref="light.name" :position="light.position" color="#ffffff" :intensity="0.5" :cast-shadow="true" />

                <!-- TODO: for shadows use this: https://stackoverflow.com/questions/49869345/how-to-cast-a-shadow-with-a-gltf-model-in-three-js -->

                <GltfModel
                    ref="model"
                    src="/models/map.gltf"
                    @load="onLoad"
                />
                <!-- <FbxModel
                    src="/models/model.fbx"
                    @load="onReady"
                    @progress="onProgress"
                    @error="onError"
                /> -->

            </Scene>
        </Renderer>
    </div>
</template>

<script>
import { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, GltfModel, AmbientLight, Raycaster, FbxModel, DirectionalLight } from 'troisjs';
export default {
    components: { Box, Camera, LambertMaterial, PointLight, Renderer, Scene, GltfModel, AmbientLight, Raycaster, FbxModel, DirectionalLight },

    data() {
        return {
            cameraPosition: {x: 0, y: 30, z: 0},
            cameraLookAt: [0, 0 ,0],
            counter : 0,
            lights: []
        }
    },

    mounted() {
        const renderer = this.$refs.renderer;
        renderer.gammaOutput = true
        renderer.gammaFactor = 2.2
        renderer.shadowMapEnabled = true;

        // const box = this.$refs.box.mesh;
        console.log(model);
        const model = this.$refs.model;
        const camera = this.$refs.camera.camera;
        console.log(camera);
        // console.log(box);
        let counter = 0;
        renderer.onBeforeRender(() => {
            // box.rotation.x += 0.01;
            // camera.position.z += 0.01;

            // do a smooth move here
            // camera.lookAt(...this.cameraLookAt);

            // camera.lookAt(camera.position.x, 0, camera.position.z);

            // if (Math.floor(camera.position.z) < Math.floor(this.cameraPosition.z)) {
            //     camera.position.z += 0.3
            // } else if(Math.floor(camera.position.z) > Math.floor(this.cameraPosition.z)) {
            //     camera.position.z -= 0.3
            // }

            // if (Math.floor(camera.position.x) < Math.floor(this.cameraPosition.x)) {
            //     camera.position.x += 0.3
            // } else if(Math.floor(camera.position.x) > Math.floor(this.cameraPosition.x)) {
            //     camera.position.x -= 0.3
            // }

            // // camera.position.z -= 0.1;
            // camera.position.y = 20;

            // const light = this.$refs["Light1"][0]?.light;
            // light.color = "#ffffff";
        });
    },
    methods: {
        onPointerEvent(event) {

            console.log(event.intersect.object.name);

            const intersectedObject = event.intersect.object

            let light;
            if (intersectedObject.name == "Device-1") light = this.$refs["Light-1"][0].light;
            if (intersectedObject.name == "Device-2") light = this.$refs["Light-2"][0].light;
            if (intersectedObject.name == "Device-3") light = this.$refs["Light-3"][0].light;
            if (intersectedObject.name == "Device-4") light = this.$refs["Light-4"][0].light;

            console.log(light);

            if (["Device-1", "Device-2", "Device-3", "Device-4"].indexOf(intersectedObject.name) != -1) {

                switch (light.color.getHexString().toUpperCase()) {
                    case "DB981C":
                        light.color.set("#FFFFFF");
                        break;
                    case "FFFFFF":
                        light.color.set("#DB981C");
                        break;
                    default:
                        light.color.set("#FFFFFF");
                        console.error("light has an invalid color : " + light.color.getHexString());
                        break;
                }
            }
        },

        onLoad(model) {
            console.log("loaded");
            console.log(model);

            // const light = model.scene.children[1];
            // light.shadowDarkness = 0.5;
            // light.castShadow = true;
            // light.matrixWorldNeedsUpdate = true;


            for(const node of model.scenes[0].children) {
                if (node.type == "Mesh") {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    console.log(node);
                    // node.matrixWorldNeedsUpdate = true
                    console.log("is mesh");
                }
            }



            for (const light of model.scene.children.filter(child => child.name.toLowerCase().includes("light"))) {
                console.log("light");
                console.log(light);
                this.lights.push(light);
            }

            // for (const device of model.scene.children.filter(child => child.name.toLowerCase().includes("device"))) {
            //     console.log(device);
            //     device.addEventListener("click", event => {
            //         console.log("test");
            //     })
            // }

            // console.log(this.lights);
        },

        test() {
            // console.log("yeahh");
            console.log(this.$refs.model.o3d.children);
            const children = this.$refs.model.o3d.children.filter(child => child.name == "Device-1" || child.name == "Device-2");
            // console.log(children);
            const child = children[this.counter];
            // console.log(child.position);
            this.cameraLookAt = child.position
            this.cameraPosition = child.position
            this.counter++;
            if (this.counter > children.length - 1) {
                this.counter = 0;
            }
        }
    }
};
</script>

<style lang="sass" scoped>
    .render-canvas
        border: 2px solid red
</style>
