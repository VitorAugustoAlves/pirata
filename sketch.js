const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, bola;

var bolas = [];
var barcoss = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);


  cannon = new Cannon(180, 110, 130, 100, angle);

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
    bolass(bolas[i],i)
    colision(i)
  }
  cannon.display();
  sbarcos()
}
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.length-1].tiro();
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
function bolass (bola,index){
  if (bola){
    bola.display();
    console.log("função de bolas")
    if  (bola.body.position.x>=width||bola.body.position.y>=height-50){
      bola.remove(index)
    }
  }
}
function sbarcos (){
  if  (barcoss.length>0){
    if(barcoss[barcoss.length-1]==undefined||barcoss[barcoss.length-1].body.position.x<width-300){
      var pos = [-40,-30,-50,-20];
      var rand = random(pos)
      barco = new Barcos(width-79, height-70, 170, 170, rand)
      barcoss.push(barco)
    }
    for(var i=0;i<barcoss.length;i++){
      if(barcoss[i]){
        Matter.Body.setVelocity(barcoss[i].body, {x:-0.7,y:0})
        barcoss[i].display();    
      }
    }
  }else{
    barco = new Barcos(width-79, height-70, 170, 170,-60)
    barcoss.push(barco)
  }
}
function colision (index){
  for(var i=0;i<barcoss.length;i++){
    if  (bolas[index]!==undefined&&barcoss[i]!==undefined){
      var bolabarco = Matter.SAT.collides(bolas[index],barcoss[i])
        if  (bolabarco.collided){
          barcoss[i].remove(i)
            Matter.World.remove(world, bolas[index].body)
              delete bolas[index]

        }
    }
  }
}