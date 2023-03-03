def on_received_number(receivedNumber):
    _4digit.show(65 / 1022 * pins.analog_read_pin(AnalogPin.P2))
    if receivedNumber > max2:
        music.start_melody(music.built_in_melody(Melodies.CHASE), MelodyOptions.ONCE)
    else:
        music.stop_melody(MelodyStopOptions.ALL)
radio.on_received_number(on_received_number)

def on_logo_pressed():
    global tel
    if tel == 1:
        tel = 0
    else:
        tel = 1
    radio.send_value("tel", tel)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

max2 = 0
_4digit: grove.TM1637 = None
tel = 0
tel = 0
music.set_volume(16)
music.start_melody(music.built_in_melody(Melodies.POWER_UP), MelodyOptions.ONCE)
_4digit = grove.create_display(DigitalPin.P1, DigitalPin.P15)
radio.set_group(255)

def on_forever():
    global max2
    if tel == 0:
        if input.button_is_pressed(Button.A):
            radio.send_value("vitmax", 40 / 1022 * pins.analog_read_pin(AnalogPin.P2))
        elif max2 != 255 / 1022 * pins.analog_read_pin(AnalogPin.P2):
            max2 = 255 / 1022 * pins.analog_read_pin(AnalogPin.P2)
            radio.send_value("max", max2)
    else:
        radio.send_value("vitmax", 40 / 1022 * pins.analog_read_pin(AnalogPin.P2))
        if input.button_is_pressed(Button.A):
            pass
        elif input.button_is_pressed(Button.B):
            pass
basic.forever(on_forever)
