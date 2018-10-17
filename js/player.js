import Entity, {Epsilon} from './entity.js';
import KeyManager from './keymanager.js';
import Vec2 from './vec2.js';

let K_LEFT = false, K_RIGHT = false;

const SPEED = 500;

export default class Player extends Entity {
    constructor(x, y, w=80, h=16) {
        super('bar', x, y, w, h);

        this.keyManager = new KeyManager();
        this.keyManager.addKey(37, isPressed=>{ K_LEFT = isPressed });
        this.keyManager.addKey(39, isPressed=>{ K_RIGHT = isPressed });
    }

    update(deltaTime) {
        if (Math.abs(this.vel.x) <= Epsilon) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) <= Epsilon) {
            this.vel.y = 0;
        }

        if (K_LEFT) {
            this.vel.x = -SPEED;
        }
        if (K_RIGHT) {
            this.vel.x = SPEED;
        }

        this.vel.y += this.gravity;
    }
}