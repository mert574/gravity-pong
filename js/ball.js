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
                const diff = (entity.pos.x + entity.size.x / 2) - this.pos.x;
                this.vel.x = diff * - 6;

                let heightCoeff = 1 - (Math.abs(diff) / 40);
                heightCoeff = Math.min(1, Math.max(0.5, heightCoeff));

                this.bounce(heightCoeff);

            } else if (entity.type === 'fixed') {
                if (entity.right === this.left) {
                    this.vel.x = this.jumpSpeed / 5;
                } else if (entity.left === this.right) {
                    this.vel.x = this.jumpSpeed / -5;
                } else if (entity.top === this.bottom) {
                    this.bounce(this.vel.y / 20);
                }
            }
        };
    }

    update(deltaTime) {
        if (this.jumping > 0) {
            this.vel.y -= this.jumpSpeed * deltaTime;
            this.jumping -= deltaTime;            
        } else {
            if (this.vel.y < 500)
                this.vel.y += this.gravity * deltaTime;
        }
    }

    bounce(coeff) {
        this.jumping = this.maxJumpDuration * coeff;
        this.vel.y = -this.jumpSpeed;
    }
}
