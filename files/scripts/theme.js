import { $, checkCookie, getCookie, setCookie } from "./min.js"

const defaultTheme = "light"
const cookieName = "color-scheme"
const themes = [ 'light', 'dark' ]
const translates = [ 'light', 'dark' ]
const icons = [ 'sunny-outline', 'moon-outline' ]
const themeSwitcher = $(document, '.theme-switcher')


setTheme(getTheme())
themeSwitcher.onclick = () => { setTheme(getNextTheme()) }


function setTheme(theme) {
    if (!isValid(theme)) return

    document.body.className = theme

    const themeIndex = themes.indexOf(theme)

    $(themeSwitcher, 'ion-icon').setAttribute('name', icons[ themeIndex ])
    $(themeSwitcher, 'span').innerText = translates[ themeIndex ]
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