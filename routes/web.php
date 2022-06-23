<?php

use App\Http\Controllers\DeviceController;
use App\Models\Device;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Process\Process;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect("/experience");
});

Route::resource("device", DeviceController::class);
// Route::get("device/{device}/on", [DeviceController::class, "on"]);
// Route::get("device/{device}/off", [DeviceController::class, "off"]);
// Route::post("device/{device}/dimm", [DeviceController::class, "dimm"]);
// Route::post("device/{device}/temperature", [DeviceController::class, "temperature"]);

Route::get("observe", function() {
    return Device::all()->toJson();
});

Route::get("playground", function() {
    return view("playground");
});

Route::get("experience", function() {
    return view("three");
});
