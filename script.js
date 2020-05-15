var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
let sectionSize = 25
let sections = 30
c.width = sectionSize*sections
c.height = sectionSize*sections

var lose = false
function randomNum(){
    let number = Math.floor(Math.random() * sections-1) + 1;
    return number * sectionSize
}
class box {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = {x:sectionSize,y:0}
        this.tail = []
        this.tail[0] = {x:this.x,y:this.y}


    }

    
drawHimself() {
    for(let i = 0;i<this.tail.length;i++){
        ctx.fillStyle = "purple"
        ctx.fillRect(this.tail[i].x, this.tail[i].y, this.w-1, this.h-1)
    }
    ctx.fillStyle = "blue"
    ctx.fillRect(this.foodx, this.foody, this.w-1, this.h-1)
    }

update(){
    let coords = {x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y}
    this.tail.shift()
    coords.x += this.dir.x
    coords.y += this.dir.y

    this.tail.push(coords)

}

grow(){
    let coords = {x:this.tail[this.tail.length-1].x,y:this.tail[this.tail.length-1].y}
    this.tail.push(coords)
}    


food(){
    var notSamePos = false
    this.foodx = randomNum()
    this.foody = randomNum()
    for(let i = 0;i<this.tail.length-1;i++){
        let coords = this.tail[i]
        if(coords.x == this.foodx && coords.y == this.foody){
            var notSamePos = false  
        } 
    }
}

eat(){
    let x = this.tail[this.tail.length-1].x
    let y = this.tail[this.tail.length-1].y
    //if (x+this.w >= this.foodx && x <= this.foodx+this.w && y <= this.foody+this.h && y+this.h >= this.foody) {
    if (x == this.foodx && y == this.foody) {
        this.food()
        this.grow()
    }

    
}

endgame(){
    let x = this.tail[this.tail.length-1].x
    let y = this.tail[this.tail.length-1].y
    if (x >= c.width-this.w+5||x < 0||y >= c.height-this.h+5||y < 0) lose = true
    for(let i = 0;i<this.tail.length-1;i++){
        let coords = this.tail[i]
        if(coords.x == x && coords.y == y) lose = true
    }
}
}


var snake = new box(sectionSize*(sections/2),sectionSize*(sections/2),sectionSize,sectionSize)
snake.food()


function loop(){
snake.endgame()
snake.eat()

document.onkeydown = function (e) {
    //console.log(snake.tail[snake.tail.length-1].x,snake.tail[snake.tail.length-1].y)
    switch (e.keyCode) {
        case 37:
            if(snake.dir.x==sectionSize && snake.tail.length > 1) break;
            snake.dir = {x:-sectionSize,y:0}
            break;
        case 38:
            if(snake.dir.y==sectionSize && snake.tail.length > 1) break;
            snake.dir = {x:0,y:-sectionSize}
            break;
        case 39:
            if(snake.dir.x==-sectionSize && snake.tail.length > 1) break;
            snake.dir = {x:sectionSize,y:0}
            break;
        case 40:
            if(snake.dir.y==-sectionSize && snake.tail.length > 1) break;
            snake.dir = {x:0,y:sectionSize}
            break;
        
    }
}
ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
snake.update()
snake.drawHimself();
}
setInterval(()=>{
    if(!lose){
        loop()
    }else{
        snake = new box(300,300,sectionSize,sectionSize)
        snake.food()
        lose = false
        document.getElementById('canvas').style.backgroundColor = "red"
        setTimeout(()=>{
            document.getElementById('canvas').style.backgroundColor = "black"
            loop()
        },10)
       
    }

},120)
