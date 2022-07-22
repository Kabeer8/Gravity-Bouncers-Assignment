let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.height = 600;
cnv.width = 1500;
let gravity1 = 15;
let gravity2 = 15;
let ballz = [];
ballz.push(newBall(750, 300, 25,"red",4 ));
ballz.push(newBall(750, 300, 25, "blue", -4));

(requestAnimationFrame)(draw);
function draw(){
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    for(i = 0; i < 2; i++){
        drawBall(ballz[i])
        animate(ballz[i])

        if (ballz[i].y >= 595){
            bounce(ballz[i])
        }
        if(gravity1 < 15){
            gravity1  += 0.25
        }
        if(ballz[i].x >= 1490){
            ballz[i].m = -4
        }
        if(ballz[i].x <= 10){
            ballz[i].m = 4
        }
        if(gravity2 < 15){
            gravity2  += 0.25
        }
    }
    
requestAnimationFrame(draw);
}

function drawBall(ball){
    x = ball.x
    y = ball.y
    r = ball.r
    color = ball.c
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}

function newBall(initX, initY, initR, initC, initM){
    return{
        x: initX,
        y: initY,
        r: initR,
        c: initC,
        m: initM
        };
}

function animate(ball){
    if (ball.c == "red"){
        ball.y += gravity1;
    }
    else if(ball.c == "blue"){
        ball.y += gravity2;
    }
    ball.x += ball.m;
}

function bounce(ball){
    if (ball.c == "red"){
        gravity1 = -15;
        ball.y += gravity1;
    }
    else if(ball.c == "blue"){
        gravity2 = -15;
        ball.y += gravity2;
    }
}

cnv.addEventListener('click',(event) =>{
    let rect = cnv.getBoundingClientRect();
    let mouseX = event.clientX- rect.left;
    let mouseY = event.clientY- rect.top;
    for(let i = 0; i < 2; ++i){
        if(dist(mouseX, mouseY, ballz[i].x, ballz[i].y) < 100){
            bounce(ballz[i]);
        }
    }
})

function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
