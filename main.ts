let _switch = 0
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.off()
I2C_LCD1602.on()
I2C_LCD1602.BacklightOn()
let state = 0
let Score = -10
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
let x = pins.analogReadPin(AnalogPin.P3)
let y = pins.analogReadPin(AnalogPin.P4)
music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
I2C_LCD1602.ShowString("IoT", 2, 0)
basic.pause(1000)
I2C_LCD1602.ShowString("Pinball", 7, 0)
basic.pause(1000)
I2C_LCD1602.ShowString("BP LAB CodingEdu", 0, 1)
basic.pause(1000)
I2C_LCD1602.clear()
basic.forever(function () {
    if (state == 0) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 100
            basic.pause(500)
        }
        if (_switch == 0 && pins.digitalReadPin(DigitalPin.P2) == 0) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 10
            basic.pause(100)
            _switch = 1
        }
        if (_switch == 1 && pins.digitalReadPin(DigitalPin.P2) == 1) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 10
            basic.pause(100)
            _switch = 0
        }
        if (pins.analogReadPin(AnalogPin.P3) < x - 15) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 5
            basic.pause(100)
        }
        if (pins.analogReadPin(AnalogPin.P3) > x + 15) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 5
            basic.pause(100)
        }
        if (pins.analogReadPin(AnalogPin.P4) < y - 15) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 5
            basic.pause(100)
        }
        if (pins.analogReadPin(AnalogPin.P4) > y + 15) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
            Score += 5
            basic.pause(100)
        }
    }
})
basic.forever(function () {
    if (Score >= 3000) {
        state = 1
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        basic.pause(500)
        I2C_LCD1602.clear()
        I2C_LCD1602.ShowString("S T A G E", 1, 0)
        basic.pause(1000)
        I2C_LCD1602.ShowString("C L E A R", 6, 1)
        basic.pause(100)
        I2C_LCD1602.BacklightOff()
        basic.pause(100)
        I2C_LCD1602.BacklightOn()
        basic.pause(100)
        I2C_LCD1602.BacklightOff()
        basic.pause(100)
        I2C_LCD1602.BacklightOn()
        basic.pause(2000)
        control.reset()
    }
})
basic.forever(function () {
    if (state == 0) {
        I2C_LCD1602.ShowString("Score :", 2, 0)
        I2C_LCD1602.ShowNumber(Score, 10, 0)
        I2C_LCD1602.ShowString("ColBilingue jose allamano", 0, 1)
    }
})
