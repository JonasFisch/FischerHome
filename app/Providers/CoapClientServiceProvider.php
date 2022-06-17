<?php

namespace App\Providers;

use App\CoapClient\CoapClient;
use Illuminate\Support\ServiceProvider;

class CoapClientServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind("coap", function() {
            return new CoapClient();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
