import { $, $a, checkCookie, getCookie, setCookie } from "./min.js"

const defaultTheme = "light"
const cookieName = "color-scheme"
const themes = [ 'light', 'dark', 'nature', 'oceanic', 'terminal' ]
const translates = [ 'light', 'dark', 'nature', 'oceanic', 'terminal' ]
const icons = [ 'sunny-outline', 'moon-outline', 'leaf-outline', 'water-outline', 'terminal-outline' ]
const themeSwitcher = $(document, '.theme-switcher')


window.addEventListener('load', () => { setTheme(getTheme()) })
themeSwitcher.onclick = () => { setTheme(getNextTheme()) }


function setTheme(theme) {
    if (!isValid(theme)) return

    document.body.className = theme

    const themeIndex = themes.indexOf(theme)

    $(themeSwitcher, 'ion-icon').setAttribute('name', icons[ themeIndex ])
    $(themeSwitcher, 'span').innerText = translates[ themeIndex ]

    $a(document, 'digit-display').forEach(dd => dd.setAttribute('theme', theme))

    setCookie(cookieName, theme, 365)
}

function getTheme() {
    return checkCookie(cookieName) ? getCookie(cookieName) : defaultTheme
}

function getNextTheme() {
    const theme = getTheme()
    let index = themes.indexOf(theme) + 1
    if (index >= themes.length) index = 0

    return themes[ index ]
}

function isValid(theme) {
    return themes.includes(theme)
}

function getDefaultTheme() {
    return defaultTheme
}

export { getTheme, getDefaultTheme, isValid }