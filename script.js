// Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

//Logic Line
//DOM-Canvas-Effect-Particle-Animate

// Create individual particles 
class Particle {
    //Initialize the Particle Attributes
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 5 + 2;

        // Initial position of the particles to be within the canvas
        this.x = this.radius + Math.random() * (this.effect.width 
            - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height 
            - this.radius * 2);

        // velocity of particles
            this.vx = Math.random() * 1 - 0.5;
            this.vy = Math.random() * 1 - 0.5;
    }
    //Initialize The Particle Render
    draw(context){
        //context.fillStyle = 'hsl(' + this.x * 0.3 + ', 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
    // Run every frame (motions and behaviour)
    update(){
        // move horizontally
        this.x+= this.vx;
        // move vertically
        this.y+= this.vy;

        // bounce particles off canvas horizontal bounds
        if (this.x > this.effect.width - this.radius || this.x < this.radius){
            this.vx *= -1;
        }

        // bounce particles off canvas vertical bounds
        if (this.y > this.effect.height - this.radius || this.y < this.radius){
            this.vy *= -1;
        }
    }
}

// Manage all particles
class Effect {
    //Initialize the Brain Of The Particles
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = [];
        this.numberOfParticles = 200;
        this.createParticles();
    }
    //Create The Particles
    createParticles(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    // Draw The Particles To Screen
    handleParticles(context){
        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        })
    }
    //constellations effect
    connectParticles(context){
        // only connect particles within 100px
        const maxDist = 100;

        //coompare each particle against all opther particles (n^2)
        for (let a = 0; a < this.particles.length; a++){
            for (let b = a; b < this.particles.length; b++){
                // calc dist x and y
                const distx = this.particles[a].x - this.particles[b].x;
                const disty = this.particles[a].y - this.particles[b].y;
                //calc hypotenuse for distance between two points
                const dist = Math.hypot(distx,disty);
                
                // if the dist is within range
                if (dist < maxDist){
                    // wrap the canvas state in save and restore to not change
                    // the opacity of all opject, just the lines
                    context.save();

                    // the opacity of the line is determinted by the dist
                    const opacity = 1- (dist/maxDist);
                    context.globalAlpha = opacity;
                    
                    context.beginPath();
                    //get the start point
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    //line to the end point
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();

                    context.restore();
                }
            }
        }
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log(effect);

// Updating and redrawing
function animate(){
    //clear previous frames
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    //animate particles
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();