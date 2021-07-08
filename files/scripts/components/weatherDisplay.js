import { isValid, getTheme } from "../theme.js"
import { $ } from '../min.js'


const conditions = {
    'unset': 'ban-outline',
    'sunny': 'sunny',
    'cloudy': 'cloud',
    'snowy': 'snow',
    'rainy': 'rainy',
    'stormy': 'thunderstorm',
}

const weather = document.createElement('template')
weather.innerHTML = `
<link rel="stylesheet" href="files/styles/components/weather.css" />

<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

<div class="weather">
    <div class="condition"><img src="" /></div>
    <span class="temperature"></span>
</div>
`


class Weather extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(weather.content.cloneNode(true))
    }

    connectedCallback() {
        if (!this.getAttribute('theme') || !isValid(this.getAttribute('theme'))) this.setAttribute('theme', getTheme())
        if (!this.getAttribute('condition') || !conditions[ this.getAttribute('condition') ]) this.setAttribute('condition', 'unset')
        if (!this.getAttribute('temperature')) this.setAttribute('temperature', '23')

        const weather = $(this.shadowRoot, '.weather')
        weather.className = `weather ${getTheme()}`

        const condition = $(this.shadowRoot, '.condition')
        const icon = $(condition, 'img')
        icon.setAttribute('src', this.getAttribute('condition'))

        const temperature = $(this.shadowRoot, '.temperature')
        temperature.innerText = this.getAttribute('temperature') + "°C"

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    switch (mutation.attributeName) {
                        case 'theme':
                            weather.className = `weather ${this.getAttribute('theme')}`
                            break
                        case 'condition':
                            icon.setAttribute('src', this.getAttribute('condition'))
                            break
                        case 'temperature':
                            let temp = parseInt(this.getAttribute('temperature'), 10)
                            if (isNaN(temp)) temp = 'INVALID!'
                            temperature.innerText = temp + "°C"
                            break
                    }
                }
            })
        })

        observer.observe(this, { attributes: true })
    }
}


window.customElements.define('weather-display', Weather)