# Maqueen+

[Maqueen plus is a STEM educational robot for micro:bit. Optimized with better power management and larger capacity power supply, it can be perfectly compatible with Huskylens AI Vision Sensor.](https://www.dfrobot.com/product-2026.html)
## Basic usage

* Control the motor speed and direction; stop motor rotating

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.mototRun(Motors.ALL, Dir.CW, 255)
DFRobotMaqueenPluss.mototStop(Motors.M1)
```

* Read the speed and direction of the left/right motor

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("speed", DFRobotMaqueenPluss.readSpeed(Motors1.M1))
    serial.writeValue("direction", DFRobotMaqueenPluss.readDirection(Motors1.M1))
})
```

* Read the state and greyscale value of the line-tracking sensor

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("patorl", DFRobotMaqueenPluss.readPatrol(Patrol.L1))
    serial.writeValue("voltage", DFRobotMaqueenPluss.readPatrolVoltage(Patrol.L1))
})

```

* Read IR value and the distance the ultrasound returns 

```blocks
DFRobotMaqueenPluss.I2CInit()
basic.forever(function () {
    serial.writeValue("IR", DFRobotMaqueenPluss.IR_read())
    serial.writeValue("ultrasonic", DFRobotMaqueenPluss.ultraSonic(PIN.P0, PIN.P0))
})

```

* Servo control module for controlling 3-way servo 

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.servoRun(Servos.S1, 100)

```

* RGB LED control module: let Maqueen Plus's RGB LEDs display various colors

```blocks
DFRobotMaqueenPluss.I2CInit()
DFRobotMaqueenPluss.setRGBLight(RGBLight.RGBL, Color.RED)

```


## License

MIT

Copyright (c) 2018, microbit/micropython Chinese community  


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
