// Auto-generated. Do not edit.
declare namespace IR {

    /**
     * button pushed.
     */
    //%block="on |%btn| button pressed" shim=IR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;

    /**
     * initialises local variablesssss
     */
    //%block="connect ir receiver to %pin" shim=IR::initIR
    function initIR(pin: Pins): void;
}

// Auto-generated. Do not edit. Really.
