<div style="border: 1px solid black;">
    <span>
        {{ $device->name }}
    </span>

    <span>
        Type: {{ $device->device_type }}
    </span>

    <div>
        <span>
            State
        </span>
        @if ($device->state == 1)
            <input type="checkbox" name="" id="state-button-{{$device->device_id}}" checked="checked">
        @else
            <input type="checkbox" name="" id="state-button-{{$device->device_id}}">
        @endif
    </div>

    @if ($device->device_type == 2)
        <div>
            <span>
                Brightness
            </span>
            <input type="range" name="" id="brightness-slider-{{$device->device_id}}" min="0" max="254" value="{{$device->brightness ?? 0}}">
        </div>

        <div>
            <span>
                Color Temperature
            </span>
            <input disabled type="range" name="" id="temperature-slider-{{$device->device_id}}" min="120" max="650" value="{{$device->color_temperature ?? 0}}">
        </div>
    @endif
</div>
