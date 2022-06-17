<template>
    <div class="device-skeleton">
        <div class="main">
            <div class="light-wrapper" @click="toggleState">
                <div :class="'light ' + (this.state ? 'active' : '')">
                    <img draggable="false" class="icon" src="/icons/lightbulb_black_24dp.svg"
                        alt="Light Icon">
                </div>
            </div>
            <span class="name">
                Schreibtischlampe
            </span>
        </div>
        <div class="option-panel">
            <div class="brightness">
                <div class="brightness-wrapper">
                    <input v-model="brightness" draggable="false" class="slider" type="range" name="brightness" id="someid"
                        min="0" max="255">
                </div>
                <img draggable="false" class="icon" src="/icons/brightness_5_black_24dp.svg"
                    alt="Brightness Icon">
            </div>
            <div class="temperature">
                <div class="temperature-wrapper">
                    <input v-model="temperature" draggable="false" class="slider temperature-0" type="range" name="temperature"
                        id="temperature-slider" min="0" max="1000">
                </div>
                <img draggable="false" class="icon" src="/icons/thermostat_black_24dp.svg"
                    alt="Temperature Icon">
            </div>
        </div>
    </div>
</template>
<script>

const UNKNOWN = null;
const OFF = false;
const ON = true;


export default {
    data() {
        return {
            brightness: "128",
            temperature: "128",
            state: ON
        }
    },

    methods: {
        toggleState() {
            this.state = !this.state
        }
    },


}
</script>
