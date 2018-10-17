import Entity from './entity.js';

export default class Ball extends Entity {
    constructor(x, y, size) {
        super('ball', x, y, size, size);
        this.color = '#0ff';
        
        this.gravity = 1000;
        this.jumpSpeed = 500;
        this.maxJumpDuration = 0.5;
        this.jumping = 0;

        this.collideEvent = entity => {
            if (entity.type === 'bar' && this.jumping <= 0) {
                this.jumping = this.maxJumpDuration;
                this.vel.y = -this.jumpSpeed;
            }
        };
    }

    update(deltaTime) {
        if (this.jumping > 0) {
            this.vel.y -= this.jumpSpeed * deltaTime;
            this.jumping -= deltaTime;            
        } else {
            this.vel.y += this.gravity * deltaTime;
        }
    }
}
