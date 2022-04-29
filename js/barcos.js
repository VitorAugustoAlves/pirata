class Barcos{
    constructor(x,y,w,h,posbarco){
        this.body = Bodies.rectangle(x,y,w,h)
        this.w = w
        this.h = h
        this.posbarco = posbarco
        this.image = loadImage("assets/boat.png")
        World.add(world,this.body)

 }
    display(){

        var p = this.body.position
        var angle = this.body.angle
        push()
        translate (p.x,p.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.image,0,this.posbarco,this.w,this.h)
        pop()
}
}