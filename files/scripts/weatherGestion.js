const apiKey = "1fd938b098812adce6a33989edfec158"
const excludes = "hourly,daily,alerts,minutely"

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&exclude=${excludes}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, weather } = data
            const icon = `https://openweathermap.org/img/wn/${weather[ 0 ][ 'icon' ]}@2x.png`
        })
        .catch(() => {
            console.log('Invalid CITY!')
        })
}

export { getWeather }