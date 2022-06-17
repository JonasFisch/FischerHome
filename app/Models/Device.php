<?php

namespace App\Models;

use App\CoapClient\CoapClient;
use App\CoapClient\CoapClientFacade;
use App\CoapClient\CoapHelper;
use App\Http\Traits\Dimmable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

class Device extends Model
{
    use HasFactory, Dimmable;

    protected $guarded = [];

    const TYPE = [
        0 => "Remote Control",
        2 => "Lamp",
        3 => "Socket",
    ];

    public function turnOn()
    {
        CoapClientFacade::put(CoapClient::DEVICE, $this->device_id, CoapHelper::LIGHT_ON);
        // TODO just if request was successful
        $this->state = 1;
        $this->save();
    }

    public function turnOff()
    {
        CoapClientFacade::put(CoapClient::DEVICE, $this->device_id, CoapHelper::LIGHT_OFF);
        // TODO just if request was successful
        $this->state = 0;
        $this->save();
    }

    public function setBrightness(int $brightness)
    {
        if ($brightness < 0 || $brightness > 254) throw new InvalidArgumentException();
        CoapClientFacade::put(CoapClient::DEVICE, $this->device_id, CoapHelper::DIMM($brightness));
        // TODO just if successful
        $this->brightness = $brightness;
        $this->save();
    }

    public function setColorTemperature(int $temperature)
    {
        CoapClientFacade::put(CoapClient::DEVICE, $this->device_id, CoapHelper::TEMPERATURE($temperature));
        // TODO just if successful
        $this->color_temperature = $temperature;
        $this->save();
    }
}
