const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, bola;

var bolas = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angle = 20;
  cannon = new Cannon(180, 110, 130, 100, angle);
  bola = new Ball(cannon.x, cannon.y);
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
  for (var i = 0; i <bolas.length; i++){
    bolass(bolas[i])
  }
  cannon.display();
}
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.lenght-1].tiro();
  }
}
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    bola = new Ball(cannon.x, cannon.y);
    bola.trajeto=[]
    Matter.Body.setAngle(bola.body,cannon.angle);
    bolas.push(bola);
  }
}
function bolass (bola){
  if (bola){
    bola.display();
  }
}
