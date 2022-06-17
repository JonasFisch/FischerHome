import axios from "axios"


let instance = null

export default class DeviceUtils {

    constructor() {
        // this class is a Singleton
        if (instance) return instance
        instance = this

        this.mapping = {}

        this.getAllDevices()

    }

    async getAllDevices() {
        let response = await axios.get("device")
        if (response.status === 200) {
            for (const device of response.data) {
                if (device.objectName) this.mapping[device.objectName] = device.id
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
