<x-layout>

    <main>
        <nav>
            <ul>
                <li>Home</li>
                <li class="selected">Kitchen</li>
                <li>Living Room</li>
                <li>Bed Room</li>
                <li>Bath Room</li>
            </ul>

            <div class="settings-button">
                <img class="icon" src="/icons/settings_black_24dp.svg" alt="" srcset="">
                <span>
                    settings
                </span>
            </div>
        </nav>

        <div class="room-container">
            <div class="heading">
                <div class="blurcontainer">
                    <span>
                        Kitchen
                    </span>
                </div>
            </div>
            <h2>
                <u>
                    Devices
                </u>
            </h2>
            <div class="device-layout">
                <div class="device-container">
                    @foreach ($devices as $device)
                        @if ($device->device_type == 2)
                            <v-light>

                            </v-light>
                        @else
                            {{-- <x-device :device="$device">

                        </x-device> --}}
                        @endif
                    @endforeach
                    {{-- <trois-example>
                        </trois-example> --}}
                </div>
                <img src="/img/roomexample.jpg" alt="" width="750" height="750" srcset=""
                    class="pseudo-model">
            </div>
            <h2>
                <u>
                    Scences
                </u>
            </h2>

            <div class="sence-container">
                <span>I am a Scene</span>
            </div>

            <div class="scene-layout">
                <v-scene name="night"></v-scene>
                <v-scene name="day"></v-scene>
                <v-scene name="movie time"></v-scene>
                <v-scene name="romantic"></v-scene>
            </div>

            {{-- <v-settings>
            </v-settings> --}}
            {{-- @foreach (['a', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd', 'b', 'c', 'd'] as $num)
                    <h1>
                        {{ $num }}
                    </h1>
                @endforeach --}}

        </div>

    </main>
</x-layout>
