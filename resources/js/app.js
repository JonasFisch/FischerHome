const { default: axios } = require('axios');
import { createApp } from 'vue';
import Light from './components/Light.vue';
import Scene from './components/Scene.vue';
import Settings from './components/Settings.vue';
import TroisExample from './components/TroisExample.vue';
import GlobalEvents from 'vue-global-events';

const app = createApp({})
app
    .component("v-light", Light)
    .component("v-scene", Scene)
    .component("v-settings", Settings)
    .component("trois-example", TroisExample)
    .mount('#app');

require('./bootstrap');

window.addEventListener("load", function() {

    for (let index = 1; index < 9; index++) {
        document.getElementById("brightness-slider-" + index)?.addEventListener("change", event => {
            axios.patch("/device/" + index, {
                "brightness": parseInt(event.target.value)
            });
        });
        document.getElementById("temperature-slider-" + index)?.addEventListener("change", event => {
            axios.patch("/device/" + index, {
                "color_temperature": parseInt(event.target.value)
            });
        });
        document.getElementById("state-button-" + index)?.addEventListener("click", event => {
            axios.patch("/device/" + index, {
                "state": Number(event.target.checked)
            });
        });
    }

    // temperature slider
    const temperaturePickers = document.querySelectorAll(".temperature-wrapper .slider");
    for (const temperaturePicker of temperaturePickers) {
        temperaturePicker.addEventListener("input", event => {
            // console.log(event.target.value);
            const temperatureIndex = Math.round((event.target.value / 1000) * 4);

            for (let index = 0; index < 5; index++) {
                temperaturePicker.classList.remove("temperature-" + index);
            }

            temperaturePicker.classList.add("temperature-" + temperatureIndex);
        })
    }

});



