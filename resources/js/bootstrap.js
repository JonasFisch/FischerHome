window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// let laravelEcho = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     wsHost: process.env.MIX_PUSHER_HOST,
//     wsPort: process.env.MIX_PUSHER_PORT,
//     wssPort: process.env.MIX_PUSHER_PORT,
//     forceTLS: false,
//     encrypted: true,
//     disableStats: true,
//     enabledTransports: ['ws', 'wss'],
// });

// laravelEcho.channel("device-channel")
//     .listen('DeviceUpdatedEvent', event => {
//         const device_id = event.device.device_id;
//         document.getElementById("state-button-" + device_id).checked = event.device.state == 1;
//         document.getElementById("brightness-slider-" + device_id).value = event.device.brightness;
//         document.getElementById("temperature-slider-" + device_id).value = event.device.color_temperature;
//     });
