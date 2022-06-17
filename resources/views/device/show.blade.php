<x-layout>

    <h1>
        Show Specific device
    </h1>

    <span>
        {{ $device["9001"] }}
    </span>

    <a href="{{ '/device/'.$device["9003"].'/on' }}">
        on
    </a>

    <a href="{{ '/device/'.$device["9003"].'/off' }}">
        off
    </a>


</x-layout>
