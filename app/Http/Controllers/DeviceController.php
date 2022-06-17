<?php

namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class DeviceController extends Controller
{


    // public function __construct() {
    //     $this->middleware("devices.update");
    // }

    public function on(Device $device) {
        $device->turnOn();
    }

    public function off(Device $device) {
        $device->turnOff();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Device::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function show(Device $device)
    {
        return $device;
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function edit(Device $device)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Device $device)
    {
        $validated = $request->validate([
            "state" => ["integer", "between:0,2"],
            "brightness" => ["integer", "between:0,254"],
            "color_temperature" => ["integer", "between:0,1000"]
        ]);
        switch ($validated["state"] ?? null) {
            case 1:
                $device->turnOn();
                break;
            case 0:
                $device->turnOff();
                break;
            default:
                break;
        }

        $brightness = $validated["brightness"] ?? null;
        if ($brightness) $device->setBrightness($brightness);

        $color_temperature = $validated["color_temperature"] ?? null;
        if ($color_temperature) $device->setColorTemperature($color_temperature);

        return $device;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function destroy(Device $device)
    {
        //
    }
}
