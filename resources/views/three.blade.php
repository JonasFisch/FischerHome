<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ThreeJS Template</title>
    <link rel="stylesheet" href="css/three.css">
</head>

<body>
    <template id="pointTemplate">
        <div class="point">
            <div class="label"></div>
        </div>
    </template>
    <div class="app">
        <canvas class="webgl">
        </canvas>
        <div class="loading-wrapper">
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
</body>

</html>