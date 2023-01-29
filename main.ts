let count = 0
basic.showLeds(`
    . # # # .
    # . . . #
    # . . . #
    # . . . #
    . # # # .
    `)
let strip = neopixel.create(DigitalPin.P12, 3, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Red))
let status = "RESET"
numeric_led.initialise_numeric_led()
numeric_led.display_number(count)
basic.forever(function () {
    if (status == "RESET") {
        if (pins.digitalReadPin(DigitalPin.P13) == 1) {
            status = "READY"
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        }
    } else if (status == "READY") {
        if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            status = "STARTED"
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
        }
    } else if (status == "STARTED") {
        count += 1
        numeric_led.display_number(count)
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
            status = "FINISHED"
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        }
    } else if (status == "FINISH") {
    	
    }
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . . # . .
            `)
    }
})
