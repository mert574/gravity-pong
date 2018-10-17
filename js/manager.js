import Entity from './entity.js';
import Ball from './ball.js';
import Player from './player.js';

let lastTime = 0;

export default class GameManager {
    constructor(context, width, height, ballSize=8) {
        this.context = context;

        this.entities = [];
        this.ballSize  = ballSize;
        this.width = width;
        this.height = height;

        this.update = this.update.bind(this);

        this.started = false;
    }

    init() {
        if (this.started) {
            throw Error('Game is already started.');
        }

        this.started = true;

        this.entities = [];

        this.player = new Player(30, this.width-50);
        this.opponent = new Entity('bar', this.height-50, this.width-50, 80, 30);
        this.ball = new Ball(106, (this.width/2)-160, this.ballSize);
    
        this.entities.push(this.player);
        this.entities.push(this.opponent);
        this.entities.push(this.ball);
    
        // walls
        this.entities.push(
            new Entity('fixed', -5, 0, 5, this.height));
        this.entities.push(
            new Entity('fixed', this.width, 0, 5, this.height));
        this.entities.push(
            new Entity('fixed', 0, -5,this.width, 5));
        this.entities.push(
            new Entity('fixed', 0, this.height, this.width, 5));
    }

    update(d=0) {
        const delta = (d - lastTime) / 1000;
        lastTime = d;
    
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.width, this.height);
    
        for (let e of this.entities) {
            e.update(delta);
            this._applyVelocity(e, delta);
            e.draw(this.context);
        }
    
        requestAnimationFrame(this.update);
    }

    start() {
        this.update();
    }

    restart() {
        this.player.keyManager.destroy();

        this.init();
        this.start();
    }

    _applyVelocity(entity, delta) {
        const nX = entity.vel.x * delta,
              nY = entity.vel.y * delta;
    
        entity.pos.x += nX;
        this.checkX(entity);
    
        entity.pos.y += nY;
        this.checkY(entity);
    
        entity.vel.sub(nX, nY);
    }
    
    checkX(entity) {
        for (let e of this.entities) {
            if (e === entity) continue;

            if (entity.overlaps(e)) {
                if (entity.vel.x > 0) { //goes right
                    entity.pos.x = e.left - entity.size.x;
                    entity.vel.x = 0;
                    
                } else if (entity.vel.x < 0) { //goes left
                    entity.pos.x = e.right;    
                    entity.vel.x = 0;
                }

                entity.collideEvent(e);
            }
        }
    }

    checkY(entity) {
        for (let e of this.entities) {
            if (e === entity) continue;

            if (entity.overlaps(e)) {
                if (entity.vel.y > 0) { //goes down
                    entity.pos.y = e.top - entity.size.y;
                    entity.vel.y = 0;
                } else if (entity.vel.y < 0) { //goes up
                    entity.pos.y = e.bottom;
                    entity.vel.y = 0;
                }

                entity.collideEvent(e);
            }
        }
    }
}
