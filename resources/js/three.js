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
