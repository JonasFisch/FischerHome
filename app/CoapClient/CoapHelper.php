<?php

namespace App\CoapClient;

use Illuminate\Validation\Rules\Enum;
use InvalidArgumentException;

class CoapHelper {

    // States
    const LIGHT_ON = '{ "3311": [{ "5850": 1 }] }';
    const LIGHT_OFF = '{ "3311": [{ "5850": 0 }] }';

    // META
    const BULB = 3311;
    const SWITCH = 3312;

    // General
    const NAME = 9001;
    const CREATION_DATE = 9002;
    const INSTANCE_ID = 9003;
    const LAST_SEEN = 9020;
    const STATE = 5850; // ON or OFF
    const DEVICE_TYPE = 5750;
    const REACHABILITY_STATE = 9019;

    // LIGHT
    const TRANSITION_TIME = 5712;
    const BRIGHTNESS = 5851;
    const LIGHT_TEMPERATURE = 5711;

    // Scene
    const SCENE_ID = 9039;
    const DEVICE_INDEX_ID = 9057;
    const IS_SCENE_PREDEFINED = 9068;
    const LIGHT_SETTINGS = 15013;

    // Color
    const COLOR_HEX_STRING = 5706;
    const HUE = 5707;
    const SATURATION = 5708;
    const COLOR_X = 5709;
    const COLOR_Y = 5710;

    static public function DIMM($lightValue)
    {
        // TODO das hier nochmal besser bauen!!! Objekt zusammen bauen, dann stringifien!
        if ($lightValue < 0 || $lightValue > 254) throw new InvalidArgumentException();
        return '{ "3311": [{ "5851": '.$lightValue.' }] }';
    }

    static public function TEMPERATURE(int $temperature)
    {
        // TODO this does not work properly!
        return '{ "3311": [{ "5711": '.$temperature.' }] }';
    }
}



