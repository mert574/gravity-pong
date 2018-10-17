import Vec2 from './vec2.js';

export const Epsilon = 499;

export default class Entity {
    constructor(type, x, y, w, h) {
        this.type = type || 'solid';

        this.pos = new Vec2(x, y);
        this.size = new Vec2(w, h);
        this.vel = new Vec2();
        
        this.gravity = 0;
        this.color = '#fff';
    }
    
    overlaps(entity) {
        return this.bottom > entity.top
            && this.top    < entity.bottom
            && this.left   < entity.right
            && this.right  > entity.left;
    }

    checkX(entities) {
        for (let e of entities) {
            if (e === this) continue;

            if (this.overlaps(e)) {
                if (this.vel.x > 0) { //goes right
                    this.pos.x = e.left - this.size.x;
                    this.vel.x = 0;
                    
                } else if (this.vel.x < 0) { //goes left
                    this.pos.x = e.right;    
                    this.vel.x = 0;
                }

                this.collideEvent(e);
            }
        }
    }

    checkY(entities) {
        for (let e of entities) {
            if (e === this) continue;

            if (this.overlaps(e)) {
                if (this.vel.y > 0) { //goes down
                    this.pos.y = e.top - this.size.y;
                    this.vel.y = 0;
                } else if (this.vel.y < 0) { //goes up
                    this.pos.y = e.bottom;
                    this.vel.y = 0;
                }

                this.collideEvent(e);
            }
        }
    }

    update() {
        if (Math.abs(this.vel.x) <= Epsilon) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) <= Epsilon) {
            this.vel.y = 0;
        }

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
