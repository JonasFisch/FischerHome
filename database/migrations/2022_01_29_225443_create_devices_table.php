<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->unsignedInteger("device_id")->unique();
            $table->unsignedInteger("device_type");
            $table->unsignedSmallInteger("state")->nullable();
            $table->unsignedSmallInteger("reachability_state")->nullable();
            $table->unsignedInteger("brightness")->nullable();
            $table->unsignedInteger("transition_time")->nullable();
            $table->unsignedInteger("color_temperature")->nullable();
            $table->string("objectName")->nullable();
            $table->string("color")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devices');
    }
}
