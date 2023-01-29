basic.show_leds("""
    . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
""")
strip = neopixel.create(DigitalPin.P12, 3, NeoPixelMode.RGB)
strip.show_color(neopixel.colors(NeoPixelColors.RED))
status = "RESET"
count = 0
numeric_led.initialise_numeric_led()
numeric_led.display_number(count)

def on_forever():
    global status, count
    if status == "RESET":
        if pins.digital_read_pin(DigitalPin.P13) == 1:
            status = "READY"
            strip.show_color(neopixel.colors(NeoPixelColors.YELLOW))
    elif status == "READY":
        if pins.digital_read_pin(DigitalPin.P13) == 0:
            status = "STARTED"
            strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif status == "STARTED":
        count += 1
        numeric_led.display_number(count)
        if pins.digital_read_pin(DigitalPin.P14) == 1:
            status = "FINISHED"
            strip.show_color(neopixel.colors(NeoPixelColors.PURPLE))
    elif status == "FINISH":
        pass
basic.forever(on_forever)

def on_forever2():
    if pins.digital_read_pin(DigitalPin.P14) == 1:
        basic.show_leds("""
            . . # . .
                        . # # . .
                        . . # . .
                        . . # . .
                        . . # . .
        """)
basic.forever(on_forever2)
