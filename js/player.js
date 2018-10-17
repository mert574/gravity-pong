import Entity from './entity.js';
import KeyManager from './keymanager.js';

let K_LEFT = false, K_RIGHT = false;

export default class Player extends Entity {
    constructor(x, y, w=80, h=16) {
        super('bar', x, y, w, h);
        
        this.dragCoefficient = 10;
        this.speed = 300;
        this.keyManager = new KeyManager();
        this.keyManager.addKey(37, isPressed=>{ K_LEFT = isPressed });
        this.keyManager.addKey(39, isPressed=>{ K_RIGHT = isPressed });
    }

    update() {
        if (K_LEFT)  { this.vel.x = -this.speed; }    
        if (K_RIGHT) { this.vel.x =  this.speed; }
    }
}