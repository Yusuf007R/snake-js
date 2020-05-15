var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
let speed = 20
let sections = 30
c.width = speed*sections
c.height = speed*sections

var lose = false
function randomNum(min,max){
    let number = Math.floor(Math.random() * sections-1) + 1;
    return number * speed
    
    /*do{
        var randomCoord = Math.floor(Math.random() * num); 
        var char = randomCoord.toString().slice(-1)
        var lastDigit = +char
        var penchar = randomCoord.toString().charAt(randomCoord.toString.length)
        var penDigit = +penchar
        console.log(lastDigit)
    }while(randomCoord%2 != 0 || lastDigit != 0 || penDigit%2 !=0 || randomCoord < 20) 
    return randomCoord*/
}
class box {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = {x:speed,y:0}
        this.tail = []
        this.tail[0] = {x:this.x,y:this.y}


    }

    
drawHimself() {
    for(let i = 0;i<this.tail.length;i++){
        ctx.fillStyle = "purple"
        ctx.fillRect(this.tail[i].x, this.tail[i].y, this.w, this.h)
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
    var notSamePos = false  
    let height = speed*25
    let width = speed*25
    //this.foodx = Math.floor((Math.random() * width - 10) + 1)
    //this.foody = Math.floor((Math.random() * height - 10) + 1)
    this.foodx = randomNum(0,height)
    this.foody = randomNum(0,height)
    for(let i = 0;i<this.tail.length-1;i++){
        let coords = this.tail[i]
        if(coords.x == this.foodx && coords.y == this.foody){
            var notSamePos = false  
        } 
    }

    
this.Varfood = true
console.log("food "+this.foodx,this.foody)
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


var snake = new box(20,20,speed,speed)
snake.food()


function loop(){
document.getElementById("xd").innerHTML = "x: "+snake.tail[snake.tail.length-1].x+ "y: "+snake.tail[snake.tail.length-1].y
document.getElementById("xdd").innerHTML = "x: "+snake.foodx+ "y: "+snake.foody



snake.endgame()
snake.eat()

document.onkeydown = function (e) {
    //console.log(snake.tail[snake.tail.length-1].x,snake.tail[snake.tail.length-1].y)
    switch (e.keyCode) {
        case 37:
            if(snake.dir.x==speed && snake.tail.length > 1) break;
            snake.dir = {x:-speed,y:0}
            break;
        case 38:
            if(snake.dir.y==speed && snake.tail.length > 1) break;
            snake.dir = {x:0,y:-speed}
            break;
        case 39:
            if(snake.dir.x==-speed && snake.tail.length > 1) break;
            snake.dir = {x:speed,y:0}
            break;
        case 40:
            if(snake.dir.y==-speed && snake.tail.length > 1) break;
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
        snake = new box(300,300,speed,speed)
        snake.food()
        lose = false
        document.getElementById('canvas').style.backgroundColor = "red"
        setTimeout(()=>{
            document.getElementById('canvas').style.backgroundColor = "black"
            loop()
        },10)
       
    }

},120)
