import { isValid, getTheme } from '../theme.js'
import { $ } from "../min.js"


const dateDisplay = document.createElement('template')
dateDisplay.innerHTML = `
<link rel="stylesheet" href="files/styles/components/date.css" />

<div class="date">
    <span class="day"></span>
    <span class="number"></span>
    <span class="month"></span>
    <span class="year"></span>
</div>
`


class DateDisplay extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(dateDisplay.content.cloneNode(true))
    }

    connectedCallback() {
        if (!this.getAttribute('theme') || !isValid(this.getAttribute('theme'))) this.setAttribute('theme', getTheme())
        if (!this.getAttribute('date') || !converts[ this.getAttribute('date') ]) this.setAttribute('date', 'Jeudi;1;Janvier;1970')

        const date = $(this.shadowRoot, '.date')
        date.className = `date ${getTheme()}`

        const parts = this.getAttribute('date').split(';')
        const day = $(this.shadowRoot, '.day')
        day.innerText = parts[0]
        const number = $(this.shadowRoot, '.number')
        number.innerText = parts[1]
        const month = $(this.shadowRoot, '.month')
        month.innerText = parts[2]
        const year = $(this.shadowRoot, '.year')
        year.innerText = parts[3]

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    switch (mutation.attributeName) {
                        case 'theme':
                            date.className = `date ${this.getAttribute('theme')}`
                            break
                        case 'date':
                            const d = this.getAttribute('date')
                            const parts = d.split(';')

                            day.innerText = parts[0]
                            number.innerText = parts[1]
                            month.innerText = parts[2]
                            year.innerText = parts[3]
                            break
                    }
                }
            })
        })

        observer.observe(this, { attributes: true })
    }
}


window.customElements.define('date-display', DateDisplay)