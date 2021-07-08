import { isValid, getTheme } from '../theme.js'
import { $ } from '../min.js'

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

const digitDisplay = document.createElement('template')
digitDisplay.innerHTML = `
<link rel="stylesheet" href="files/styles/components/segments.css" />

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
        this.shadowRoot.appendChild(digitDisplay.content.cloneNode(true))
    }

    connectedCallback() {
        if (!this.getAttribute('theme') || !isValid(this.getAttribute('theme'))) this.setAttribute('theme', getTheme())
        if (!this.getAttribute('number') || !converts[ this.getAttribute('number') ]) this.setAttribute('number', ' ')
        
        const digit = $(this.shadowRoot, '.digit')
        digit.className = `digit ${getTheme()}`
        const c = converts[ this.getAttribute('number') ]
        for (let i = 0; i < segments.length; i++) this.shadowRoot.querySelector('.' + segments[ i ]).setAttribute('state', c[ i ])

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    switch (mutation.attributeName) {
                        case 'number':
                            const c = converts[ this.getAttribute('number') ]
                            for (let i = 0; i < segments.length; i++) this.shadowRoot.querySelector('.' + segments[ i ]).setAttribute('state', c[ i ])
                            break
                        case 'theme':
                            const theme = this.getAttribute('theme')
                            digit.className = `digit ${theme}`
                    }
                }
            })
        })
        observer.observe(this, { attributes: true })
    }
}


window.customElements.define('digit-display', Displayer)