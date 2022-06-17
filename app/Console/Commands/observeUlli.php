<?php

namespace App\Console\Commands;

use App\CoapClient\CoapHelper;
use App\Events\DeviceUpdatedEvent;
use App\Models\Device;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Exception\ProcessSignaledException;
use Symfony\Component\Process\Process;

class observeUlli extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observe:device {device_id : The ID of the device that should be observed.}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Starts to observe an given device.';

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

        $device_id = $this->argument("device_id");
        $request_skeleton = [
            "coap-client",
            "-m", "get",
            "-u", config("ikea.gateway.username"),
            "-k", config("ikea.gateway.preshared_key"),
            "-s", 20000,
            "-B", 20000,
            "coaps://".config("ikea.gateway.url").":5684/15001/".$device_id,
            "&"
        ];

        $this->info("start observation...");
        Log::info("start observation...");

        try {
            $process = new Process($request_skeleton);
            $process->setTimeout(null);
            $process->run(function($type, $buffer) use($device_id) {
                Log::info($buffer);
                $this->info($buffer);

                // waiting for process to finish
                if (Process::ERR === $type) $this->warn($buffer);
                else {
                    $this->info($buffer);
                    $updatedDevice = json_decode($buffer, true);
                    $device = Device::where("device_id", $device_id)->first();

                    // sometimes the buffer is null!
                    if ($updatedDevice != null && array_key_exists(CoapHelper::BULB, $updatedDevice)) {
                        $bulb = $updatedDevice[CoapHelper::BULB][0];
                        $device->state = $bulb[5850];
                        $device->brightness = $bulb[CoapHelper::BRIGHTNESS];
                        $device->color_temperature = $bulb[CoapHelper::LIGHT_TEMPERATURE];
                        $device->save();
                        DeviceUpdatedEvent::dispatch($device);
                    }
                }

            });
        } catch(ProcessSignaledException $exception) {
            Log::warning("Observation of ".$device_id." stopped!");
            return;
        }

        while ($process->isRunning()) {
            // waiting for process to finish
        }
        $this->info("Observation finished.");



    }
}
