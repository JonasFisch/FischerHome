<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;

class ObserveAllDevicesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observe:all';

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

        $this->info("php ".base_path("artisan")." observe:device "."65541 > /dev/null 2>&1 &");
        $state = exec("php ".base_path("artisan")." observe:device "."65541 > /dev/null 2>&1 &");


        $this->info("php ".base_path("artisan")." observe:device "."65541 > /dev/null 2>&1 &");
        $another = exec("php ".base_path("artisan")." observe:device "."65542 > /dev/null 2>&1 &");
        // if (!$state) {
        //     Log::error("Error in observe all");
        // } else {
        //     Log::info("Successfully started");
        // }

        while (1)
        {
            sleep(200);
        }
        // $process = new Process(['php', base_path("artisan"), "observe:device", 65541]);
        // $process->setTimeout(0);
        // $process->disableOutput();
        // $process->start();

        // $process2 = new Process(['php', base_path("artisan"), "observe:device", 65542]);
        // $process2->setTimeout(0);
        // $process2->disableOutput();
        // $process2->start();

        // $processes[] = $process;
        // array_push($processes, $process2);

        // while (count($processes)) {
        //     foreach ($processes as $i => $runningProcess) {

        //         // specific process is finished, so we remove it
        //         if (!$runningProcess->isRunning()) {
        //             unset($processes[$i]);
        //         }
        //     }
        //     sleep(1);
        // }
        // return 0;
    }
}
