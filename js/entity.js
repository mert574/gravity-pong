import Vec2 from './vec2.js';

export default class Entity {
    constructor(type, x, y, w, h) {
        this.type = type || 'solid';

        this.pos = new Vec2(x, y);
        this.size = new Vec2(w, h);
        this.vel = new Vec2();
        
        this.gravity = 0;
        this.dragCoefficient = 1;
        this.color = '#fff';
    }
    
    overlaps(entity) {
        return this.bottom > entity.top
            && this.top    < entity.bottom
            && this.left   < entity.right
            && this.right  > entity.left;
    }

    update() {
        this.vel.y += this.gravity;
    }

    get top() {
        return this.pos.y;
    }

    get left() {
        return this.pos.x;
    }

    get right() {
        return this.left + this.size.x;
    }

    get bottom() {
        return this.top + this.size.y;
    }

    draw(context) {
        context.fillStyle = this.color;

        context.fillRect(
            this.pos.x, this.pos.y,
            this.size.x, this.size.y);
    }

    collideEvent() {
    }
}
