var scene = document.querySelector('a-scene')
var duration = 200
var value = 0.5
var gamepad = navigator.getGamepads ? navigator.getGamepads() : ( navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null )
console.log(gamepad)
gamepad[0].hapticActuators.pulse(value,duration)