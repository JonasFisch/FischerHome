<template >
    <div class="container">
        <h1>
            {{ name }}
        </h1>
        <div class="icon-wrapper">
            <img class="icon" src="/icons/hotel_black_24dp.svg" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
        }
    }
}
</script>


<style lang="sass">
@import "../../sass/variables"

.container
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)
    border-radius: $border-radius
    margin: 15px 15px 0 0
    padding: 10px
    background: #fff
    height: 15rem
    aspect-ratio: 1/1
    position: relative

    h1
        text-align: center

    .icon-wrapper
        background-color: #00bfff
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        border-radius: 50%
        height: 100px
        aspect-ratio: 1/1

        display: flex
        justify-content: center
        align-items: center
        .icon
            height: 50px

</style>
