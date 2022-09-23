const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix
//     .js('resources/js/app.js', 'public/js')
//     .vue()
//     .sass('resources/sass/app.sass', 'css/app.css');

mix
    .js("resources/js/three.js", "public/js/three.js")
    .sass('resources/sass/three/three.sass', 'css/three.css')

mix
    .js("resources/js/playground.js", "public/js/playground.js")
    .sass('resources/sass/playground.sass', 'css/playground.css')

mix.options({
    hmrOptions: {
        host: '127.0.0.1',
        port: 8080,
    }
});
