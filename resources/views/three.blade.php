<x-layout>
    <template id="pointTemplate">
        <div class="point">
            <div class="label"></div>
        </div>
    </template>
    <h1>
        FischerHome
    </h1>
    <div class="experience">
        <canvas class="webgl">
        </canvas>
        <div class="loading-wrapper">

            <div class="circle">
            </div>

            <div class="loading">
                <span class="label">
                    Loading ...
                </span>
                <div class="bar">
                    <div class="progress">
                    </div>
                </div>
                <span class="error-label">
                    Error while loading 3D Experience please reload the page or try later.
                </span>
            </div>
        </div>
    </div>
    <script src="{{ mix('js/three.js') }}"></script>
</x-layout>

</html>
