import { $ } from './min.js'

const segments = [ "a", "b", "c", "d", "e", "f", "g" ]
const converts = {
    " ": [ false, false, false, false, false, false, false ],
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

const t = document.createElement('template')
t.innerHTML = `
<link rel="stylesheet" href="files/styles/segments.css" />

<div class="digit">
    <span class="segment a" state="false"></span>
    <div class="digit-line">
        <span class="segment f" state="false"></span>
        <span class="segment b" state="false"></span>
    </div>
    <span class="segment g" state="false"></span>
    <div class="digit-line">
        <span class="segment e" state="false"></span>
        <span class="segment c" state="false"></span>
    </div>
    <span class="segment d" state="false"></span>
</div>
`


class Displayer extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(t.content.cloneNode(true))
    }

    connectedCallback() {
        if (!this.getAttribute('number') || !converts[ this.getAttribute('number') ]) this.displayNumber(' ')
        else this.displayNumber(this.getAttribute('number'))
    }

    displayNumber(number) {
        const states = converts[ number ]
        for (let i = 0; i < segments.length; i++) this.shadowRoot.querySelector('.' + segments[ i ]).setAttribute('state', states[ i ])
        return number !== ' ' ? parseInt(number) : undefined
    }

    displayTheme(old, cur) {
        const digit = $(this.shadowRoot, '.digit')
        digit.classList.remove(old)
        digit.classList.add(cur)
    }
}


window.customElements.define('digit-display', Displayer)