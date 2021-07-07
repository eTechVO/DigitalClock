import { $, $a } from "./min.js"

const hourTens = $(document, '.hours__tens')
const hourUnits = $(document, '.hours__units')
const minutesTens = $(document, '.minutes__tens')
const minutesUnits = $(document, '.minutes__units')
const dayDisplay = $(document, '.digital__display__date__day-name')
const numberDisplay = $(document, '.digital__display__date__day-nbr')
const monthDisplay = $(document, '.digital__display__date__month')
const yearDisplay = $(document, '.digital__display__date__year')

const converts = {
    "0": [ true, true, true, true, true, true, false ],
    "1": [ false, true, true, false, false, false, false ],
    "2": [ true, true, false, true, true, false, true ],
    "3": [ true, true, true, true, false, false, true ],
    "4": [ false, true, true, false, false, true, true ],
    "5": [ true, false, true, true, false, true, true ],
    "6": [ true, false, true, true, true, true, true ],
    "7": [ true, true, true, false, false, false, false ],
    "8": [ true, true, true, true, true, true, true ],
    "9": [ true, true, true, true, false, true, true ],
}
const segments = [ "a", "b", "c", "d", "e", "f", "g" ]
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
    setInterval(loadDate, 1000)
}


function loadDate() {
    const now = new Date()
    const day = days[ now.toUTCString().substring(0, 3) ]
    const number = now.toUTCString().substring(5, 7)
    const month = months[now.getMonth()]
    const year = now.getFullYear()

    const hours = ( now.getHours() < 10 ? "0" : "" ) + now.getHours()
    const minutes = ( now.getMinutes() < 10 ? "0" : "" ) + now.getMinutes()
    const time = hours + minutes

    dayDisplay.innerText = day
    numberDisplay.innerText = number
    monthDisplay.innerText = month
    yearDisplay.innerText = year

    convert(hourTens, time.charAt(0))
    convert(hourUnits, time.charAt(1))
    convert(minutesTens, time.charAt(2))
    convert(minutesUnits, time.charAt(3))
}

function convert(elem, value) {
    for (let i = 0; i < segments.length; i++) {
        const seg = $(elem, '.' + segments[ i ])
        const state = converts[ value ][ i ]
        seg.setAttribute('state', state)
    }
}