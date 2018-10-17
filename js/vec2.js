export default class Vec2 {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
       this.x = x;
       this.y = y; 
    }

    add(x=0, y=0) {
        this.x += x;
        this.y += y;
    }

    sub(x=0, y=0) {
        this.add(-x, -y);
    }
}