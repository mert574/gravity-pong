import Entity from './entity.js';
import Ball from './ball.js';
import Player from './player.js';

let lastTime = 0;
const EPSILON = 10;

export default class GameManager {
    constructor(context, width, height, ballSize=8) {
        this.context = context;

        this.entities = [];
        this.ballSize  = ballSize;
        this.width = width;
        this.height = height;

        this.middleBarH = 100;
        this.middleBarW = 5;

        this.update = this.update.bind(this);

        this.started = false;

        document.addEventListener('keypress', event=>{            
            if (!this.started) {
                this.started = true;
            }
        });
    }

    init() {
        if (this.started) {
            throw Error('Game is already started.');
        }

        this.started = true;
        this.entities = [];

        this.player = new Player(30, this.width-50);
        this.opponent = new Entity('bar', this.height-110, this.width-50, 80, 16);
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
            new Entity('scoreTrigger', 0, this.height, this.width, 5));

        this.entities.push(
            new Entity('fixed', (this.width/2) - this.middleBarW/2, 
                (this.height-this.middleBarH), this.middleBarW, this.middleBarH));
    }

    update(d=0) {
        const delta = (d - lastTime) / 1000;
        lastTime = d;
    
        if (this.started || d === 0) {
            this.context.fillStyle = '#000';
            this.context.fillRect(0, 0, this.width, this.height);
        
            for (let e of this.entities) {
                e.update(delta);
                this._applyVelocity(e, delta);
                e.draw(this.context);
            }

            this.context.fillText(`Score1: ${this.score[0]}\t||\tScore2: ${this.score[1]}`, 10, 10);
        }
        
        requestAnimationFrame(this.update);
    }

    start() {
        this.score = [0, 0];
        this.newRound();
        this.update(0);
    }

    restart() {
        this.player.keyManager.destroy();
        this.init();
        this.start();
    }

    gameOver() {
        this.started = false;
        console.log('game over! score: ', this.score);
    }

    addScore() {
        const middleOfBall = this.ball.left + this.ball.size.y/2;
        const middleOfScreen = this.width/2;

        if (middleOfBall > middleOfScreen) {
            this.score[0]++;
        } else if (middleOfBall < middleOfScreen) {
            this.score[1]++;
        }
    }

    newRound() {
        const randSwing = Math.max(Math.random() * 500, 100) * (Math.random() > 0.5 ? -1 : 1);

        this.started = false;
        this.ball.pos.set((this.width/2) - this.ballSize/2, 25);
        this.ball.vel.set(randSwing, 0);
    }

    _applyVelocity(entity, delta) {
        const nX = entity.vel.x * delta,
              nY = entity.vel.y * delta;
    
        entity.pos.x += nX;
        this.checkX(entity);
    
        entity.pos.y += nY;
        this.checkY(entity);
    
        entity.vel.sub(nX * entity.dragCoefficient, nY * entity.dragCoefficient);

        if (Math.abs(entity.vel.x) < EPSILON)
            entity.vel.x = 0;
        if (Math.abs(entity.vel.y) < EPSILON)
            entity.vel.y = 0;
    }
    
    checkX(entity) {
        for (let e of this.entities) {
            if (e === entity) continue;

            if (entity.overlaps(e)) {

                if (e.type === 'scoreTrigger') {
                    this.addScore();
                    this.newRound();
                    return;
                }

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
                if (e.type === 'scoreTrigger') {
                    this.addScore(e);
                    this.newRound();
                    return;
                }

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
