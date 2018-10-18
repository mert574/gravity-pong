import Entity from './entity.js';

export default class Opponent extends Entity {
    constructor(x, y, w=80, h=16, trackingElem, activationOffset=0) {
        super('bar', x, y, w, h);

        this.track = trackingElem;
        this.offset = activationOffset;
        this.difficulty = 0.6;
    }

    update() {
        if (this.track.left > this.offset ) {
            const diff = (this.track.middle - this.middle) + this.difficulty;
            this.vel.x += diff / (1 / this.difficulty);
        }
    }

    set difficulty(d) {
        this._difficulty = Math.min(1, Math.abs(d));
    }

    get difficulty() {
        return this._difficulty;
    }
}
