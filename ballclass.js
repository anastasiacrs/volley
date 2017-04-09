const G = 9.8;
const START_SPEED = 90;
const START_ANGLE = 45;

let centerX = 250;
let centerY = 250;
let radius = 20;

let Y_DIR = 1;

class Vector {
    constructor(v, angle) {
        this.v = v;
        this.a = angle * (Math.PI / 180);
    }
}
class Ball {
    constructor(x, y, r, velocity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velocity = velocity;
        this.t0 = Date.now();
        this.x0 = x;
        this.y0 = y;
        firstDrawBall(this.x, this.y, this.r);
        this.ball = ball;
    }
    draw() {
        drawBall(this.x, this.y);
    }
    currentVelocity() {
        let v0 = this.velocity.v;
        let t = (Date.now() - this.t0) / 100; //todo
        let alpha = this.velocity.a;
        return Math.sqrt(Math.pow(v0, 2) - 2 * v0 * G * t * Math.sin(alpha) + Math.pow(G * t, 2));
    }
    currentAngle() {
        let v0 = this.velocity.v;
        let t = (Date.now() - this.t0) / 100;
        let alpha = this.velocity.a;
        //console.log("currentAngle", v0, t, alpha*180/Math.PI, Math.cos(alpha));
        let angle = Math.atan((v0 * Math.sin(alpha) - G * t) / (v0 * Math.cos(alpha)));
        if (Math.cos(alpha) < 0.0001 || Math.cos(alpha) > -0.0001) {
            return alpha;
        }
        if (Math.cos(alpha) < 0) {
            angle += Math.PI;
        }
        return angle;
    }
    bounce(angle) {
        this.velocity.v = this.currentVelocity();
        this.velocity.a = 2 * Math.PI - this.currentAngle() + 2 * Math.atan(angle);
        this.t0 = Date.now();
        this.x0 = this.x;
        this.y0 = this.y;
    }
    collides(o) {
        let distance = Math.sqrt(Math.pow(this.x - o.position.z, 2) + Math.pow(this.y - o.position.y, 2));
        return distance <= this.r + o.radius;
    }


    move(borderY, borderX) {
        let v0 = this.velocity.v;
        let alpha = this.velocity.a;
        let t = (Date.now() - this.t0) / 100;
        this.x = this.x0 + v0 * t * Math.cos(alpha);
        this.y = this.y0 + Y_DIR * (v0 * t * Math.sin(alpha) - 0.5 * G * Math.pow(t, 2));
        let angle = Math.atan((v0 * Math.sin(alpha) - G * t) / (v0 * Math.cos(alpha)));
        if (Math.cos(alpha) < 0) {
            angle += Math.PI;
        }
        if ((this.x + this.r >= borderX && Math.cos(alpha) > 0) || (this.x - this.r <= 0 && Math.cos(alpha) < 0)) {
            this.bounce();
            this.velocity.a = Math.PI - angle;
        } else if ((this.y - this.r <= 0 && Y_DIR * Math.sin(angle) < 0) || (
                this.y + this.r >= borderY && Y_DIR * Math.sin(angle) > 0)) {
            this.bounce(0);
        }
    }
}