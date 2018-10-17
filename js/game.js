import Game from './gamemanager.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

const GAME = new Game(ctx, canvas.width, canvas.height);

GAME.init();
GAME.start();
