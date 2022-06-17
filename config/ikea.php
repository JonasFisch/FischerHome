<?php

return [
    'gateway' => [
        "username" => env('IKEA_GATEWAY_USERNAME', ''),
        "url" => env('IKEA_GATEWAY_URL', ''),
        "preshared_key" => env('IKEA_GATEWAY_PRESHARED_KEY', ''),
        "firmware_version" => env('IKEA_GATEWAY_FIRMWARE_VERSION', ''),
    ]
];
