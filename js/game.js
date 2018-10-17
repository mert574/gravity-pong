import Entity from './entity.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const MAX_SPEED = 500;

let entities = [];
let player, opponent, ball;
let K_LEFT = false, K_RIGHT = false;


function init() {
    const barWidth  = 80;
    const barHeight = 16;
    const ballSize  = 8;
    const gravity = 250;

    //player init
    player = new Entity();
    player.type = 'bar';
    player.color = '#fff';
    player.pos.set(30, width-50);
    player.size.set(barWidth, barHeight);
    entities.push(player);

    //opponent init
    opponent = new Entity();
    opponent.type = 'bar';
    opponent.color = '#fff';
    
    opponent.pos.set(height-barWidth-30, width-50);
    opponent.size.set(barWidth, barHeight);
    entities.push(opponent);

    //ball init
    ball = new Entity();
    ball.type = 'ball';
    ball.color = '#0ff';
    ball.pos.set(106, (width/2)-160);
    ball.size.set(ballSize, 10);
    ball.gravity = gravity;
    
    ball.collideEvent = function onCollide(entity) {
        if (entity.type === 'bar') {
            this.vel.y = -3000;

            return true;
        } else {
            return false;
        }
    }

    entities.push(ball);

    //walls
    //left
    const leftWall = new Entity();
    leftWall.type = 'fixed';
    leftWall.pos.set(-5, 0);
    leftWall.size.set(5, height);
    entities.push(leftWall);
    
    //right
    const rightWall = new Entity();
    rightWall.type = 'fixed';
    rightWall.pos.set(width, 0);
    rightWall.size.set(5, height);
    entities.push(rightWall);

    //top
    const topWall = new Entity();
    topWall.type = 'fixed';
    topWall.pos.set(0, -5);
    topWall.size.set(width, 5);
    entities.push(topWall);

    //bottom
    const bottomWall = new Entity();
    bottomWall.type = 'fixed';
    bottomWall.pos.set(0, height);
    bottomWall.size.set(width, 5);
    entities.push(bottomWall);

}

let lastTime = 0;
//let frames = 0;

function update(d=0) {
    const delta = (d - lastTime) / 1000;
    lastTime = d;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (K_LEFT) {
        player.vel.x = -MAX_SPEED;
    }
    if (K_RIGHT) {
        player.vel.x = MAX_SPEED;
    }


    for (let e of entities) {
        e.update(delta);

        const nX = e.vel.x * delta,
              nY = e.vel.y * delta;

        e.pos.x += nX;
        e.checkX(entities);

        e.pos.y += nY;
        e.checkY(entities);

        e.vel.sub(nX, nY);

        e.draw(ctx);
    }

    //frames = (frames + 1) % 60;

    requestAnimationFrame(update);
}

document.addEventListener('keydown', onKeyPress);
document.addEventListener('keyup', onKeyPress);

function onKeyPress(e) {
    if (e.which === 37) {
        K_LEFT = e.type === 'keydown';
        e.preventDefault();
    } else if (e.which === 39) {
        K_RIGHT = e.type === 'keydown';
        e.preventDefault();
    }
}

init();
update();