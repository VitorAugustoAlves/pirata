class Barcos{
    constructor(x,y,w,h,posbarco){
        this.body = Bodies.rectangle(x,y,w,h)
        this.w = w
        this.h = h
        this.posbarco = posbarco
        this.animation = boatAnimation
        this.speed = 0.05
        this.isBroken = false
       // this.image = loadImage("assets/boat.png")
        World.add(world,this.body)

 }
    display(){
        var p = this.body.position
        var angle = this.body.angle
        var index = floor(this.speed%this.animation.length)
        push()
        translate (p.x,p.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.posbarco,this.w,this.h)
        pop()
}
remove (index){
    this.animation = brokenBoatAnimation
    this.speed = 0.05
    this.w = 300
    this.h = 300
    this.broken = true
    setTimeout(() => {
     Matter.World.remove(world, barcoss[index].body)
     delete barcoss[index]   
    },2000);
}
animate(){
    this.speed += 0.05
}
}