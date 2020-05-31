
function rem() {
    let width = document.documentElement.clientWidth
    document.documentElement.style.fontSize = width / 3.75 + 'px'
    document.body.style.fontSize = "16px"
}
rem()

window.onresize = function() {
    rem()
}