<?php

namespace App\CoapClient;

use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class CoapClient
{

    const DEVICE = "15001";
    const GROUP = "15004";
    const SCENE = "15005";
    const NOTIFICATION = "15006";
    const SMART_TASKS = "15010";
    const GATEWAY = "15011";

    /**
     * @param endpoint type that should be accessed (DEVICE, GROUP or SCENE)
     * @param accessor_id specific id of the endpoint
     * @param body content to send to the accessor. When not given nothing is send.
     */
    public function sendCoapRequest($endpoint, $accessor_id, $method, $body = null)
    {
        $request_skeleton = ["coap-client", "-m", $method, "-u", config("ikea.gateway.username"), "-k", config("ikea.gateway.preshared_key"), "coaps://".config("ikea.gateway.url").":5684/".$endpoint."/".$accessor_id];
        if ($body) array_push($request_skeleton, "-e", $body);

        $process = new Process($request_skeleton);
        $process->run();
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return json_decode($process->getOutput(), true);
    }

    /**
     * @param endpoint @see sendCoapRequest
     * @param accessor_id @see sendCoapRequest
     */
    public function get($endpoint, $accessor_id)
    {
        return $this->sendCoapRequest($endpoint, $accessor_id, "get");
    }

    /**
     * @param endpoint @see sendCoapRequest
     * @param accessor_id @see sendCoapRequest
     * @param body @see sendCoapRequest
     */
    public function put($endpoint, $accessor_id, $body)
    {
        return $this->sendCoapRequest($endpoint, $accessor_id, "put", $body);
    }



    public function observe($endpoint, $accessor_id, $duration)
    {

    }
}
