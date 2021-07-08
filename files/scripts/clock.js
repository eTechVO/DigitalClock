import { $, $a } from "./min.js"

const digits = $a(document, 'digit-display')

const dayDisplay = $(document, '.digital__display__date__day-name')
const numberDisplay = $(document, '.digital__display__date__day-nbr')
const monthDisplay = $(document, '.digital__display__date__month')
const yearDisplay = $(document, '.digital__display__date__year')

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
    const day = days[ now.toDateString().substring(0, 3) ]
    const number = now.toDateString().substring(8, 10)
    const month = months[now.getMonth()]
    const year = now.getFullYear()

    const hours = ( now.getHours() < 10 ? "0" : "" ) + now.getHours()
    const minutes = ( now.getMinutes() < 10 ? "0" : "" ) + now.getMinutes()
    const time = hours + minutes

    dayDisplay.innerText = day
    numberDisplay.innerText = number
    monthDisplay.innerText = month
    yearDisplay.innerText = year

    for (let i = 0; i < digits.length; i++) { digits[ i ].displayNumber(time.charAt( i )) }
}