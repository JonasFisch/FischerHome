<template>
    <div class="settings">
        <div class="settings-gateway">
            <h1>
                Gateway Informations
            </h1>

            <button>
                reboot gateway
            </button>

            <button>
                reset gateway
            </button>

            <button>
                update gateway firmware
            </button>
        </div>
        <div class="settings-threejs">
            <h1>
                ThreeJS Settings
            </h1>

            <span>
                Render Quality
            </span>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
    @import "../../sass/variables"

    .settings
        // visibility: hidden
        position: absolute
        height: 100vh
        width: 25%
        top: 0
        right: 0
        background-color: lightgreen
        padding: 2rem

        display: flex
        flex-direction: column

        button
            background-color: red
            border-radius: $border-radius
            border: none
            padding: 15px
            font-size: 1.5rem
            font-weight: 700
            margin: 20px

        .settings-gateway
            display: flex
            flex-direction: column

        .settings-threejs
            display: flex
            flex-direction: column


</style>
