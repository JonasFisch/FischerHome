<?php

namespace App\Console\Commands;

use App\CoapClient\CoapClient;
use App\CoapClient\CoapClientFacade;
use App\CoapClient\CoapHelper;
use App\Models\Device;
use Illuminate\Console\Command;

class InitiateDevicesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'devices:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $devices = CoapClientFacade::get(CoapClient::DEVICE, "");

        foreach ($devices as $device_id) {

            $details = CoapClientFacade::get(CoapClient::DEVICE, $device_id);
            $bulb = $details[CoapHelper::BULB][0] ?? null;
            $switch = $details[CoapHelper::SWITCH][0] ?? null;
            $device_type = $details[CoapHelper::DEVICE_TYPE];

            // collect data for device
            $device_skeleton = [
                "name" => $details[CoapHelper::NAME],
                "device_id" => $device_id,
                "device_type" => $details[CoapHelper::DEVICE_TYPE],
                "reachability_state" => $details[CoapHelper::REACHABILITY_STATE],
            ];

            switch (Device::TYPE[$device_type]) {
                case "Socket":
                    $device_skeleton["state"] = $switch[CoapHelper::STATE] ?? 2;
                    $device_skeleton["brightness"] = $switch[CoapHelper::BRIGHTNESS] ?? null;
                    $device_skeleton["transition_time"] = $switch[CoapHelper::TRANSITION_TIME] ?? null;
                    break;
                case "Lamp":
                    $device_skeleton["state"] = $bulb[CoapHelper::STATE] ?? 2;
                    $device_skeleton["brightness"] = $bulb[CoapHelper::BRIGHTNESS] ?? null;
                    $device_skeleton["transition_time"] = $bulb[CoapHelper::TRANSITION_TIME] ?? null;
                    $device_skeleton["color_temperature"] = $bulb[CoapHelper::LIGHT_TEMPERATURE] ?? null;
                    $device_skeleton["color"] = $bulb[CoapHelper::COLOR_HEX_STRING] ?? null;
                    break;
                case "Remote Control":
                default:
                    break;
            }

            Device::updateOrCreate(
                ["device_id" => $device_id],
                $device_skeleton
            );

            $this->info($device_id." created");
        }
    }
}
