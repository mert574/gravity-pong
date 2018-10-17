import Entity, {Epsilon} from './entity.js';
import Vec2 from './vec2.js';

export default class Ball extends Entity {
    constructor(x, y, size) {
        super('ball', x, y, size, size);

        this.color = '#0ff';
        this.gravity = 250;

        this.collideEvent = function onCollide(entity) {
            if (entity.type === 'bar') {
                this.vel.y = -3000;
            }
        }
    }
}
