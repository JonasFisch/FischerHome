# kill all running coap-cient worker
killall coap-client

# fetch all device
jsonData=$(curl -H "Accept: application/json"  http://127.0.0.1:8000/observe)
for row in $(echo "${jsonData}" | jq -r '.[] | @base64'); do
    _jq() {
     echo "${row}" | base64 --decode | jq -r "${1}"
    }

    # OPTIONAL
    # Set each property of the row to a variable
    name=$(_jq '.name')
    value=$(_jq '.device_id')

    php artisan observe:device $value &

    # Utilize your variables
    echo "$name = $value"
done
