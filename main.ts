radio.onReceivedNumber(function (receivedNumber) {
    _4digit.show(65 / 1022 * pins.analogReadPin(AnalogPin.P2))
    if (receivedNumber > max) {
        music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
    } else {
        music.stopMelody(MelodyStopOptions.All)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (tel == 1) {
        tel = 0
    } else {
        tel = 1
    }
    radio.sendValue("tel", tel)
})
let max = 0
let _4digit: grove.TM1637 = null
let tel = 0
tel = 0
music.setVolume(16)
music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
_4digit = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
radio.setGroup(255)
basic.forever(function () {
    if (tel == 0) {
        if (input.buttonIsPressed(Button.A)) {
            radio.sendValue("vitmax", 40 / 1022 * pins.analogReadPin(AnalogPin.P2))
        } else if (max != 255 / 1022 * pins.analogReadPin(AnalogPin.P2)) {
            max = 255 / 1022 * pins.analogReadPin(AnalogPin.P2)
            radio.sendValue("max", max)
        }
    } else {
        radio.sendValue("vitmax", 40 / 1022 * pins.analogReadPin(AnalogPin.P2))
        if (input.buttonIsPressed(Button.A)) {
            radio.sendString("gauche")
        } else if (input.buttonIsPressed(Button.B)) {
            radio.sendString("droite")
        }
    }
})
