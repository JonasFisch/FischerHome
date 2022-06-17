import Experience from './three/Experience.js'
import DeviceUtils from './util/DeviceUtils.js';

startExperience()

async function startExperience() {
    // load device information first
    const deviceUtil = new DeviceUtils()
    await deviceUtil.init()

    // start web experience
    const experience = new Experience(document.querySelector("canvas.webgl"))
}




import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

let laravelEcho = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: process.env.MIX_PUSHER_HOST,
    wsPort: process.env.MIX_PUSHER_PORT,
    wssPort: process.env.MIX_PUSHER_PORT,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

laravelEcho.channel("device-channel")
    .listen('DeviceUpdatedEvent', event => {

        console.log("Device Updated")
        console.log(event)
        const device_id = event.device.device_id
        // document.getElementById("state-button-" + device_id).checked = event.device.state == 1;
        // document.getElementById("brightness-slider-" + device_id).value = event.device.brightness;
        // document.getElementById("temperature-slider-" + device_id).value = event.device.color_temperature;
    });
