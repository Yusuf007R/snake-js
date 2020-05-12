var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.width = 500
c.height = 500
var x = 10
var y = 200
class box {
    constructor(x, y, w, h, c, s) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.s = s
        this.c = c
        this.colas = [1,2]

    }

    drawHimself() {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }


    food() {
        this.foodx = Math.floor((Math.random() * c.width - 10) + 1)
        this.foody = Math.floor((Math.random() * c.height - 10) + 1)
    }

    



}

function lados(x, y, w, h, queLado) {
    if (queLado == null) return
    switch (queLado) {
        case 'derecho':
            return x + w
        case 'izquierdo':
            return x
        case 'arriba':
            return y
        case 'abajo':
            return y + h
    }

}



const box1 = new box(20, 20, 20, 20, "red", 5)

function update() {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                box1.x = box1.x - box1.s
                break;
            case 38:
                box1.y = box1.y - box1.s
                break;
            case 39:
                box1.x = box1.x + box1.s
                break;
            case 40:
                box1.y = box1.y + box1.s
                break;
        }
    };
    /*if (box1.x >= c.width) box1.x = 1
    if (box1.x <= 0) box1.x = c.width - 1
    if (box1.y >= c.width) box1.y = 1
    if (box1.y <= 0) box1.y = c.height - 1
    let box1derecho = lados(box1.x, box1.y, box1.w, box1.h, "derecho")
    let box1izquierdo = lados(box1.x, box1.y, box1.w, box1.h, "izquierdo")
    let box1arriba = lados(box1.x, box1.y, box1.w, box1.h, "arriba")
    let box1abajo = lados(box1.x, box1.y, box1.w, box1.h, "abajo")

    let box2derecho = lados(box2.x, box2.y, box2.w, box2.h, "derecho")
    let box2izquierdo = lados(box2.x, box2.y, box2.w, box2.h, "izquierdo")
    let box2arriba = lados(box2.x, box2.y, box2.w, box2.h, "arriba")
    let box2abajo = lados(box2.x, box2.y, box2.w, box2.h, "abajo")

    if (box1derecho >= box2izquierdo && box1izquierdo <= box2derecho && box1arriba <= box2abajo && box1abajo >= box2arriba) {
        console.log("colide")
    }*/
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    box1.drawHimself()
    requestAnimationFrame(update);
}
update();