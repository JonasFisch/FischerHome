import axios from "axios"
import Echo from 'laravel-echo';
import EventEmitter from "../three/Utils/EventEmitter";

let instance = null

export default class DeviceUtils extends EventEmitter {

    constructor() {

        super()
        // this class is a Singleton
        if (instance) return instance
        instance = this

        this.mapping = {}

        window.Pusher = require('pusher-js');

        // init Laravel Echo
        this.laravelEcho = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            wsHost: process.env.MIX_PUSHER_HOST,
            wsPort: process.env.MIX_PUSHER_PORT,
            wssPort: process.env.MIX_PUSHER_PORT,
            forceTLS: false,
            encrypted: true,
            disableStats: true,
            enabledTransports: ['ws', 'wss'],
        })
    }

    async init() {
        let response = await axios.get("device")
        if (response.status === 200) {
            for (const device of response.data) {
                if (device.objectName) this.mapping[device.objectName] = device
            }
        } else {
            console.log("Error: ", res.status);
        }
    }

    changeDeviceState(id, state) {
        return axios.put(`/device/${id}`, {
            state
        })
    }
}
