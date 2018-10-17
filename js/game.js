import Entity from './entity.js';
import Ball from './ball.js';
import Player from './player.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let entities = [];
let lastTime = 0;

function init() {
    const ballSize  = 8;
    const width = canvas.width;
    const height = canvas.height;

    const player = new Player(30, canvas.width-50);
    const opponent = new Entity('bar', height-50, width-50, 80, 30);
    const ball = new Ball(106, (width/2)-160, ballSize);

    entities.push(player);
    entities.push(opponent);
    entities.push(ball);

    // walls
    entities.push(
        new Entity('fixed', -5, 0, 5, height));
    entities.push(
        new Entity('fixed', width, 0, 5, height));
    entities.push(
        new Entity('fixed', 0, -5,width, 5));
    entities.push(
        new Entity('fixed', 0, height, width, 5));
}

function update(d=0) {
    const delta = (d - lastTime) / 1000;
    lastTime = d;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let e of entities) {
        e.update(delta);
        applyVelocity(e, delta);
        e.draw(ctx);
    }

    requestAnimationFrame(update);
}

function applyVelocity(entity, delta) {
    const nX = entity.vel.x * delta,
          nY = entity.vel.y * delta;

    entity.pos.x += nX;
    entity.checkX(entities);

    entity.pos.y += nY;
    entity.checkY(entities);

    entity.vel.sub(nX, nY);
}

init();
update();