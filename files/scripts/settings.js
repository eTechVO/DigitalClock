import { $, $a } from "./min.js";

const toggleBtn = $(document, '.digital__settings__toggle')
const actions = $(document, '.digital__settings__actions')

window.onclick = (e) => {
    if (e.target !== toggleBtn && e.target.parentNode !== actions && actions.classList.contains('opened')) {
        e.preventDefault()
        actions.classList.remove('opened')
    }
}
toggleBtn.onclick = () => { actions.classList.toggle('opened') }