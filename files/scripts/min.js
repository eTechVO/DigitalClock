function $(src, selec) {
    return src.querySelector(selec)
}

function $a(src, selec) {
    return src.querySelectorAll(selec)
}

function setCookie(cname, cvalue, exp) {
    const expDate = new Date()
    expDate.setTime(expDate.getTime() + (exp * 60 * 60 * 24 * 1000))
    const expires = "expires=" + expDate.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    const name = cname + "="
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(";")

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === " ") c = c.substring(1)
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return undefined
}

function checkCookie(cname) {
    return getCookie(cname) !== undefined && getCookie(cname) !== null;
}

function deleteCookie(cname) {
    document.cookie = cname + "=" + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
}

export { $, $a, setCookie, getCookie, checkCookie, deleteCookie }