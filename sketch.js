const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, bola;

var bolas = [];
var barcoss = [];

var boatAnimation = [];
var boatJSON, boatIMG;

var brokenBoatAnimation = [];
var brokenBoatJSON, brokenBoatIMG;

var waterSplashAnimation = [];
var waterSplashJSON, waterSplashIMG;

var isGameOver = false
var pirarin = false

var agua, pirata, fundo, canhao 
var pontuacao = 0

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  boatJSON = loadJSON("assets/boat/boat.json");
  boatIMG = loadImage("assets/boat/boat.png");
  brokenBoatJSON = loadJSON("assets/boat/broken_boat.json");
  brokenBoatIMG = loadImage("assets/boat/broken_boat.png");

  waterSplashJSON = loadJSON("assets/water_splash/water_splash.json");
  waterSplashIMG = loadImage("assets/water_splash/water_splash.png");

  fundo = loadSound ("assets/background_music.mp3")
  pirata = loadSound ("assets/pirate_laugh.mp3")
  agua = loadSound ("assets/cannon_water.mp3")
  canhao = loadSound ("assets/cannon_explosion.mp3")
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

  var brokenBoatFrames = brokenBoatJSON.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatIMG.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  var waterSplashFrames = waterSplashJSON.frames;
  for (var i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashIMG.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
  var boatFrames = boatJSON.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatIMG.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);
  if  (!fundo.isPlaying()){
    fundo.play()
    fundo.setVolume(1)
  }
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
  fill("gray")
  textSize(25)
  text("Pontuação: "+pontuacao, width-250,40)
}
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bolas[bolas.length-1].tiro();
    canhao.play()
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
    bola.animate()
    console.log("função de bolas")
    if  (bola.body.position.x>=width||bola.body.position.y>=height-50){
      bola.remove(index)
      agua.play()
      
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
        barcoss [i].animate()
        var collid = Matter.SAT.collides(this.tower, barcoss[i].body)
        if    (collid.collided&&!barcoss[i].isBroken){
          if  (!pirarin&&!pirata.isPlaying()){
            pirata.play()
            pirarin = true
          }
          gameOver()
          isGameOver = true
        }    
      }else {
        barcoss[i]
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
      var bolabarco = Matter.SAT.collides(bolas[index].body, barcoss[i].body)
        if  (bolabarco.collided){
          pontuacao += 1
          barcoss[i].remove(i)
            Matter.World.remove(world, bolas[index].body)
              delete bolas[index]

        }
    }
  }
}
function gameOver() {
  swal({
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}