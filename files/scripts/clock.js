import { $, $a } from "./min.js"
import { getWeather } from "./weatherGestion.js"

const digits = $a(document, 'digit-display')
const date = $(document, 'date-display')

const apiKey = "1fd938b098812adce6a33989edfec158"
const excludes = "hourly,daily,alerts,minutely"
const city = "Gougenheim"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&exclude=${excludes}`

const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
]
const days = {
    "Mon": "Lundi",
    "Tue": "Mardi",
    "Wed": "Mercredi",
    "Thu": "Jeudi",
    "Fri": "Vendredi",
    "Sat": "Samedi",
    "Sun": "Dimanche",
}

window.onload = () => {
    loadDate()
    setInterval(loadDate, 5000)
}


function loadDate() {
    const now = new Date()
    const day = days[ now.toDateString().substring(0, 3) ]
    const number = now.toDateString().substring(8, 10)
    const month = months[ now.getMonth() ]
    const year = now.getFullYear()

    const hours = ( now.getHours() < 10 ? "0" : "" ) + now.getHours()
    const minutes = ( now.getMinutes() < 10 ? "0" : "" ) + now.getMinutes()
    const time = hours + minutes

    for (let i = 0; i < digits.length; i++) { digits[ i ].setAttribute('number', time.charAt( i )) }
    date.setAttribute('date', day + ';' + ( number.startsWith('0') ? number.substring(1) : number ) + ';' + month + ';' + year)

    // Weather data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, weather } = data
            const icon = `https://openweathermap.org/img/wn/${weather[ 0 ][ 'icon' ]}@2x.png`
            const temp = Math.round(main.temp)

            const displayer = $(document, 'weather-display')
            displayer.setAttribute('condition', icon)
            displayer.setAttribute('temperature', temp)
        })
        .catch(() => {
            console.log('Invalid CITY!')
        })
}