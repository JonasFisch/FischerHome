import Experience from "../Experience";

export default class PointOfInterest {

    constructor(position, number, text) {
        // get context elements
        this.experience = new Experience()
        this.camera = this.experience.camera.instance
        this.sizes = this.experience.sizes

        // set attributes
        this.position = position
        this.element = document.querySelector(`.point-${number}`) 

    }

    update() {
        const screenPosition = this.position.clone()
        screenPosition.project(this.camera)

        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        this.element.style.transform = `translate(${translateX}px, ${translateY}px)`
    }
}