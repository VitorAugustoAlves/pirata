class Ball {
 constructor(x,y){
  var options = {
        isStatic: true
      }
      this.raio = 30
      this.body = Bodies.circle(x,y,this.raio,options)
      this.image = loadImage("assets/cannonball.png")
      this.trajeto = []
      World.add(world,this.body)
 }
 tiro(){
    Matter.Body.setStatic(this.body,false)
    var cangl = cannon.angle - 28
    cangl = cangl*(3.14/180)
    var veloc = p5.Vector.fromAngle()
    veloc.mult(0.5)
    Matter.Body.setVelocity(this.body,{x:veloc.x*(180/3.14),y:veloc.y*(180/3.14)})
 }
 display(){
    var p = this.body.position
    push()
    imageMode(CENTER)
    image(this.image,p.x,p.y,this.raio,this.raio)
    pop()
    if (this.body.velocity.x > 0&&p.x>10) {
       var posi=[p.x,p.y]
       this.trajeto.push(posi)
    }
    for (var i=0;i<this.trajeto.length;i++) {
      image(this.image,this.trajeto[i][0],this.trajeto[i][1],5,5)
    }
 }
}

