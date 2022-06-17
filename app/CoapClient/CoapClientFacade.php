<?php

namespace App\CoapClient;

use Illuminate\Support\Facades\Facade;

class CoapClientFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return "coap";
    }
}
