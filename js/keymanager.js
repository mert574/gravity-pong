const PRESSED = true;
const NOT_PRESSED = false;

export default class KeyManager {
    constructor() {
        this.keys = new Map();
        this.keyStates = new Map();

        ['keydown', 'keyup'].forEach(eventName=>{
            document.addEventListener(eventName, this._handleEvent.bind(this));
        });
    }

    addKey(keyCode, callback) {
        this.keys.set(keyCode, callback);
        this.keyStates.set(keyCode, NOT_PRESSED);
    }

    _handleEvent(event) {
        const keyCode = event.keyCode;
        const keyState = event.type === 'keydown' ? PRESSED : NOT_PRESSED;

        if (!this.keys.has(keyCode)) return;

        if (this.keyStates.get(keyCode) !== keyState) {
            this.keyStates.set(keyCode, keyState);
            this.keys.get(keyCode)(keyState, keyCode);
            
            event.preventDefault();
        }
    }
}