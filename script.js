// Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white';
console.log(ctx);

//Logic Line
//DOM-Canvas-Effect-Particle-Animate

// Create individual particles 
class Particle {
    //Initialize the Particle Attributes
    constructor(effect){
        this.effect = effect;
        this.radius = 15;

        // Initial position of the particles to be within the canvas
        this.x = this.radius + Math.random() * (this.effect.width 
            - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height 
            - this.radius * 2);

        // velocity of particles
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 4 - 2;
    }
    //Initialize The Particle Render
    draw(context){
        context.fillStyle = 'hsl(' + this.x * 0.3 + ', 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
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
        this.particles.forEach(particles => {
            particles.draw(context);
            particles.update();
        })
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