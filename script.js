var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = 800
c.height = 800
var lose = false
class box {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = {x:15,y:0}
        this.tail = []
        this.tail[0] = {x:this.x,y:this.y}


    }

    
drawHimself() {
    for(let i = 0;i<this.tail.length;i++){
        ctx.fillStyle = "purple"
        ctx.fillRect(this.tail[i].x, this.tail[i].y, this.w-1, this.h-1)
    }
    if(this.Varfood){
        ctx.fillStyle = "blue"
        ctx.fillRect(this.foodx, this.foody, this.w, this.h)
    }
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
    do{
    let height = c.height-this.h
    let width = c.width-this.w
    this.foodx = Math.floor((Math.random() * width - 10) + 1)
    this.foody = Math.floor((Math.random() * height - 10) + 1)
    for(let i = 0;i<this.tail.length-1;i++){
        let coords = this.tail[i]
        if(coords.x == this.foodx && coords.y == this.foody){
            var notSamePos = false  
        } 
    }
}while(this.foodx%2 != 0 && this.foody%2 != 0 && notSamePos == false)
    this.Varfood = true
}

eat(){
    let x = this.tail[this.tail.length-1].x
    let y = this.tail[this.tail.length-1].y
    if (x+this.w >= this.foodx && x <= this.foodx+this.w && y <= this.foody+this.h && y+this.h >= this.foody) {
        this.food()
        this.grow()
    }

    
}

endgame(){
    let x = this.tail[this.tail.length-1].x
    let y = this.tail[this.tail.length-1].y
    if (x >= c.width-this.w||x <= 0||y >= c.height-this.h||y <= 0) lose = true
    for(let i = 0;i<this.tail.length-1;i++){
        let coords = this.tail[i]
        if(coords.x == x && coords.y == y) lose = true
    }
}
}


var snake = new box(300,300,25,25)
let speed = 25
snake.food()


function loop(){

snake.endgame()
snake.eat()

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            if(snake.dir.x==speed) break;
            snake.dir = {x:-speed,y:0}
            break;
        case 38:
            if(snake.dir.y==speed) break;
            snake.dir = {x:0,y:-speed}
            break;
        case 39:
            if(snake.dir.x==-speed) break;
            snake.dir = {x:speed,y:0}
            break;
        case 40:
            if(snake.dir.y==-speed) break;
            snake.dir = {x:0,y:speed}
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
        snake = new box(300,300,25,25)
        snake.food()
        lose = false
        document.getElementById('canvas').style.backgroundColor = "red"
        setTimeout(()=>{
            document.getElementById('canvas').style.backgroundColor = "black"
            loop()
        },10)
       
    }

},90)
