import Manager from './manager.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

const GAME = new Manager(ctx, canvas.width, canvas.height);

GAME.init();
GAME.start();
