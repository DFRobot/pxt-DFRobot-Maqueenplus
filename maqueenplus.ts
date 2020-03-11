/** 
 * @file pxt-dfrobot_maqueenplus/maqueenplus.ts
 * @brief DFRobot's maqueen makecode library.
 * @n [Get the module here](https://)
 * @n This is a MakeCode graphical programming education robot.
 * 
 * @copyright    [DFRobot](http://www.dfrobot.com), 2016
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](jie.tang@dfrobot.com)
 * @version  V0.1.1
 * @date  2019-11-19
*/

let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0
let maqueencb: Action

enum PIN {
    P0 = 3,
    P1 = 2,
    P2 = 1,
    P8 = 18,
    //P9 = 10,
    P12 = 20,
    P13 = 23,
    P14 = 22,
    P15 = 21,
};
/**
* 电机
*/
enum Motors {
    //% block="left"
    M1 = 1,
    //% block="right"
    M2 = 2,
    //% block="ALL"
    ALL = 3
}

enum Motors1 {
    //% block="left"
    M1 = 1,
    //% block="right"
    M2 = 2,
}


/**
 * 正反转
 */
enum Dir {
    //% block="CW"
    CW = 0,
    //% block="CCW"
    CCW = 1
}

/**
 * 舵机
 */
enum Servos {
    //% block="S1"
    S1 = 1,
    //% block="S2"
    S2 = 2,
    //% block="S3"
    S3 = 3
}

/**
 * RGB灯
 */
enum RGBLight {
    //%block="RGB_L"
    RGBL = 1,
    //%block="RGB_R"
    RGBR = 2,
    //%block="ALL"
    RGBA = 3
}

/**
 * 寻线传感器
 */
enum Patrol {
    //% block="L1"
    L1 = 1,
    //%block="L2"
    L2 = 2,
    //%block="L3"
    L3 = 5,
    //%block="R1"
    R1 = 3,
    //%block="R2"
    R2 = 4,
    //%block="R3"
    R3 = 6
}

/**
 * 超声波单位
 */
enum Sonicunit {
    //% block="cm"
    Centimeters
}

/**
 * PID开关
 */
enum PID {
    //%block="OFF"
    OFF = 0,
    //%block="ON"
    ON = 1
}
/**
 * RGB灯颜色
 */
enum Color {
    //%block="Red"
    RED = 1,
    //%block="Green"
    GREEN = 2,
    //%block="Yellow"
    YELLOW = 3,
    //%block="Blue"
    BLUE = 4,
    //%block="Violet"
    PINK = 5,
    //%block="Cyan"
    CYAN = 6,
    //%block="White"
    WHITH = 7,
    //%block="Put out"
    PUT = 8

}

//% weight=100  color=#00A654   block="Maqueen Plus" icon="\uf067"
namespace DFRobotMaqueenPluss {

    export class Packeta {
        public mye: string;
        public myparam: number;
    }
   
    /**
    * I2C初始化
    */
    //%block="initialize via I2C until success"
    export function I2CInit():void{
        let Version_v = 0;
        pins.i2cWriteNumber(0x10, 0x32, NumberFormat.Int8LE);
        Version_v = pins.i2cReadNumber(0x10, NumberFormat.Int8LE);
        while (Version_v==0){
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `, 10)
            basic.pause(500)
            basic.clearScreen()
            pins.i2cWriteNumber(0x10, 0x32, NumberFormat.Int8LE);
            Version_v = pins.i2cReadNumber(0x10, NumberFormat.Int8LE);
        }
        basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `, 10)
        basic.pause(500)
        basic.clearScreen()
    }

    /**
     * 开启PID
     */
    //%block="PID switch|%pid"
    export function PID(pid: PID): void {
        let buf = pins.createBuffer(2);
        buf[0] = 0x0A;
        buf[1] = pid;
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * 控制电机运行
     */
    //% block="Motor|%index|direction|%direction|speed|%speed "
    //% speed.min=0 speed.max=255
    export function mototRun(index: Motors, direction: Dir, speed: number): void {
        let _speed:number;
        _speed=Math.round(speed/1.11);
        if (index == 1) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = _speed;
            pins.i2cWriteBuffer(0x10, buf)

        } if (index == 2) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x02;
            buf[1] = direction;
            buf[2] = _speed;
            pins.i2cWriteBuffer(0x10, buf)
        }
        if (index == 3) {
            let buf = pins.createBuffer(5)
            buf[0] = 0x00;
            buf[1] = direction;
            buf[2] = _speed;
            buf[3] = direction;
            buf[4] = _speed;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }
    /**
    * 控制电机停止
    */
    //% block="Motor|%index stop"
    export function mototStop(index: Motors): void {

        if (index == 1) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf)

        } if (index == 2) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x02;
            buf[1] = 0;
            buf[2] = 0;
            pins.i2cWriteBuffer(0x10, buf)
        }
        if (index == 3) {
            let buf = pins.createBuffer(5)
            buf[0] = 0x00;
            buf[1] = 0;
            buf[2] = 0;
            buf[3] = 0;
            buf[4] = 0;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }


    /**
     * 电机补偿
     */
    //% block="Motor Compensation|%motor speed|%speed"
    //% speed.min=0 speed.max=10
    export function mostotCompensation(motor: Motors1, speed: number): void {
        let buf = pins.createBuffer(2)
        if (motor == 1) {
            buf[0] = 0x08;
            buf[1] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        } else if (motor == 2) {
            buf[0] = 0x09;
            buf[1] = speed;
            pins.i2cWriteBuffer(0x10, buf)
        }
    }
    /**
     * 读电机转速
     */
    //%block="read Motor|%index speed"
    export function readSpeed(index: Motors1): number {
        let _speed:number;
        pins.i2cWriteNumber(0x10, 0, NumberFormat.Int8LE)
        let speed_x = pins.i2cReadBuffer(0x10, 4)
        if (index == 1) {
            return Math.round(1.11 * speed_x[1]);
        } else if (index == 2) {
            return Math.round(1.11 * speed_x[3]);
        }
        return -1;
    }
    /**
     * 读电机正反转
     */
    //%block="read Motor|%index direction(stop:0,forward:1,back:2)"
    export function readDirection(index: Motors1): number {
        pins.i2cWriteNumber(0x10, 0, NumberFormat.Int8LE)
        let dir_x = pins.i2cReadBuffer(0x10, 4)
        if (index == 1) {
            return dir_x[0]

        } else if (index == 2) {
            return dir_x[2]
        }
        return -1
    }

    /**
     * 舵机
     */
    //% block="servo|%index|angle|%angle"
    //% angle.min=0  angle.max=180
    export function servoRun(index: Servos, angle: number): void {
        let buf = pins.createBuffer(2)
        switch (index) {
            case 1:
                buf[0] = 0x14;
                buf[1] = angle;
                pins.i2cWriteBuffer(0x10, buf);
                break;
            case 2:
                buf[0] = 0x15;
                buf[1] = angle;
                pins.i2cWriteBuffer(0x10, buf);
                break;
            default:
                buf[0] = 0x16;
                buf[1] = angle;
                pins.i2cWriteBuffer(0x10, buf);
                break;
        }
    }

    /**
     * RGB灯
     */
    //% block="set |%rgbshow color|%color"
    export function setRGBLight(rgbshow: RGBLight, color: Color): void {

        if (rgbshow == 1) {
            let buf = pins.createBuffer(2)
            buf[0] = 0x0B;
            buf[1] = color;
            pins.i2cWriteBuffer(0x10, buf);
        } if (rgbshow == 2) {
            let buf = pins.createBuffer(2)
            buf[0] = 0x0C;
            buf[1] = color;
            pins.i2cWriteBuffer(0x10, buf);
        } if (rgbshow == 3) {
            let buf = pins.createBuffer(3)
            buf[0] = 0x0B;
            buf[1] = color;
            buf[2] = color;
            pins.i2cWriteBuffer(0x10, buf);
        }

    }

    /**
     * 寻线传感器
     */
    //%block="read patrol sensor|%patrol"
    export function readPatrol(patrol: Patrol): number {
        pins.i2cWriteNumber(0x10, 0x1D, NumberFormat.Int8LE);
        let patrol_y = pins.i2cReadBuffer(0x10, 1);
        let mark: number ;
        switch (patrol) {
            case 1: mark = (patrol_y[0] & 0x04) == 0x04 ? 1 : 0; break;
            case 2: mark = (patrol_y[0] & 0x02) == 0x02 ? 1 : 0; break;
            case 3: mark = (patrol_y[0] & 0x08) == 0x08 ? 1 : 0; break;
            case 4: mark = (patrol_y[0] & 0x10) == 0x10 ? 1 : 0; break;
            case 5: mark = (patrol_y[0] & 0x01) == 0x01 ? 1 : 0; break;
            case 6: mark = (patrol_y[0] & 0x20) == 0x20 ? 1 : 0; break;
        }
        
        return mark
    }

    /**
     * 读取巡线传感器灰度值
     */
    //% block="read patrol sensor|%patrol voltage "
    export function readPatrolVoltage(patrol: Patrol): number {
        pins.i2cWriteNumber(0x10, 0x1E, NumberFormat.Int8LE);
        let patrolv_y = pins.i2cReadBuffer(0x10, 12);
        let patrol_AD: number;
        switch (patrol) {
            case 1:
                patrol_AD = patrolv_y[5] | patrolv_y[4] << 8;
                break;
            case 2:
                patrol_AD = patrolv_y[3] | patrolv_y[2] << 8;
                break;
            case 3:
                patrol_AD = patrolv_y[7] | patrolv_y[6] << 8;
                break;
            case 4:
                patrol_AD = patrolv_y[9] | patrolv_y[8] << 8;
                break;
            case 5:
                patrol_AD = patrolv_y[1] | patrolv_y[0] << 8;
                break;
            default:
                patrol_AD = patrolv_y[11] | patrolv_y[10] << 8;
                break;

        }
        return patrol_AD;
    }
    /**
     * 读版本号
     */
    //%block="get product information"
    export function readVersion(): string {
        pins.i2cWriteNumber(0x10, 0x32, NumberFormat.Int8LE);
        let Version_v = pins.i2cReadNumber(0x10, NumberFormat.Int8LE);
        pins.i2cWriteNumber(0x10, 0x33, NumberFormat.Int8LE);
        let Version_y = pins.i2cReadBuffer(0x10, Version_v);
        let Version_x = Version_y.toString();
        return Version_x;
    }
    /**
     * 超声波
     */
    //%block="read ultrasonic sensor T|%T E|%E cm"
    export function ultraSonic(T: PIN, E: PIN): number {
        let maxCmDistance = 500;
        let _T;
        let _E;
        switch (T) {
            case PIN.P0: _T = DigitalPin.P0; break;
            case PIN.P1: _T = DigitalPin.P1; break;
            case PIN.P2: _T = DigitalPin.P2; break;
            case PIN.P8: _T = DigitalPin.P8; break;
            case PIN.P12: _T = DigitalPin.P12; break;
            // case PIN.P10: _T = DigitalPin.P10; break;
            case PIN.P13: _T = DigitalPin.P13; break;
            case PIN.P14: _T = DigitalPin.P14; break;
            case PIN.P15: _T = DigitalPin.P15; break;
            default: _T = DigitalPin.P0; break;
        }

        switch (E) {
            case PIN.P0: _E = DigitalPin.P0; break;
            case PIN.P1: _E = DigitalPin.P1; break;
            case PIN.P2: _E = DigitalPin.P2; break;
            case PIN.P8: _E = DigitalPin.P8; break;
            //case PIN.P9: _E = DigitalPin.P9; break;
            case PIN.P12: _E = DigitalPin.P12; break;
            case PIN.P13: _E = DigitalPin.P13; break;
            case PIN.P14: _E = DigitalPin.P14; break;
            case PIN.P15: _E = DigitalPin.P15; break;
            default: _E = DigitalPin.P0; break;
        }

        let ultraSonic_d;
        pins.digitalWritePin(_T, 0);
        if (pins.digitalReadPin(_E) == 0) {
            pins.digitalWritePin(_T, 1);
            // basic.pause(10);
            pins.digitalWritePin(_T, 0);
            ultraSonic_d = pins.pulseIn(_E, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(_T, 0);
            // basic.pause(10);
            pins.digitalWritePin(_T, 1);
            ultraSonic_d = pins.pulseIn(_E, PulseValue.Low, maxCmDistance * 58);
        }
        let ultraSonic_x = ultraSonic_d / 39;
        if (ultraSonic_x <= 0 || ultraSonic_x > 500) {
            return 0;
        }
        // switch (sonic) {
        //     case Sonicunit.Centimeters: 
        //     default: return Math.round(ultraSonic_x/2.54) //Math.idiv(ultraSonic_d, 2.54);
        // }
        return Math.round(ultraSonic_x);


    }
    /**
     * 紅外 infra-red sensor
     */
    //% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        return
    }
    //% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {
        return
    }
    //% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {
        if (alreadyInit == 1) {
            return
        }
        initIR(Pins.P16);
        alreadyInit = 1;
    }


    //%  block="on IR received"
    export function IR_callbackUser(maqueencb: (message: number) => void) {
        maqueenInit();
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet.myparam);
        });
    }


    //%  block="read IR"
    export function IR_read(): number {
        maqueenInit();
        return getParam();
    }

    function IR_callback(a: Action): void {
        maqueencb = a;
        IrPressEvent += 1;
        onPressEvent(IrPressEvent, maqueencb);
    }
}
