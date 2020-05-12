var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = 400
c.height = 400

class box {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = {x:1,y:0}
        this.tail = []
        this.tail[0] = {x:this.x,y:this.y}


    }

    
drawHimself() {
    for(let i = 0;i<this.tail.length;i++){
        ctx.fillStyle = "red"
        ctx.fillRect(this.tail[i].x, this.tail[i].y, this.w, this.h)
    }
    }

update(){
    let coords = {x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y}
    this.tail.shift()
    coords.x += this.dir.x
    coords.y += this.dir.y
    this.tail.push(coords)
    console.log(this.tail)
}

grow(){
    let coords = {x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y}
    this.tail.push(coords)

}    

}

var x = new box(300,300,15,15)
function loop(){
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            x.dir = {x:-10,y:0}
            break;
        case 38:
            x.dir = {x:0,y:-10}
            break;
        case 39:
            x.dir = {x:10,y:0}
            break;
        case 40:
            x.dir = {x:0,y:10}
            break;
        case 32:
            x.grow()
            break;
    }
}
ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
x.update()
x.drawHimself();
    
}
setInterval(()=>loop(),60)
