// Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'red';
console.log(ctx);



//Logic Line
//DOM-Canvas-Effect-Particle-Animate

// Create individual particles 
class Particle {
    //Initialize the Particle Attributes
    constructor(effect){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;
    }
    //Initialize The Particle Render
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
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
        this.numberOfParticles = 20;
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
        })
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);
console.log(effect);

// Updating and redrawing
function animate(){

}