let i=200;
class Circle{
    constructor(radius, centerX, centerY, rotation, speed){
        this.radius = radius;
        this.centerX = centerX;
        this.centerY = centerY;
        this.rotation = rotation;
        this.speed  = speed;
    }
    rotatePrimary(){
        this.rotation += this.speed;
    }
    rotateSecondary(circle){
        this.rotation += this.speed;
        const radian = Math.PI/180;
        this.centerX =(circle.centerX+circle.radius*Math.cos(circle.rotation*radian));
        this.centerY =(circle.centerY+circle.radius*Math.sin(circle.rotation*radian));
    }
}
function rotateCircles(circles){
    let i;
    clearGraph();
    circles[0].rotatePrimary();
    draw_circle(circles[0]);
    for(i=1; i<circles.length; i++){
        circles[i].rotateSecondary(circles[i-1]);
        draw_circle(circles[i]);
    }
    let circle = circles[i-1];
    draw_vector(circle.centerX, circle.centerY);
}

function clearGraph(){
    let c = document.getElementById("graph");
    let ctx=c.getContext("2d");
    ctx.clearRect(0,0,1500,1500);
}
let oldX;
let oldY;
function draw_vector(x,y){
    let c = document.getElementById("graph2");
    let ctx=c.getContext("2d");
    let colors = ["red", "blue", "green", "black", "purple"];
    ctx.lineWidth = "1";
    /*if(i < 100){
        i++;
    }else{
        i=0;
        ctx.beginPath();

        ctx.lineTo(oldX,oldY);
        ctx.strokeStyle= colors[Math.floor(Math.random()*6)]
    }*/
    ctx.strokeStyle = "red";
    ctx.lineTo(x,y);
    //oldX=x;oldY=y;
    ctx.stroke();
}

function setup(){
    let c = document.getElementById("graph2");
    let ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle= "red";
    let i;
    let circles = [];
    let circle;
    const radian = Math.PI/180;
    circles.push(new Circle(100, 750, 300, Math.floor(Math.random()*11),.2));
    circle = circles[0];
    for(i=9; i>=0; i--){
        circles.push(new Circle(i*10, (circle.centerX+circle.radius*Math.cos(circle.rotation*radian)), (circle.centerY+circle.radius*Math.sin(circle.rotation*radian)), Math.floor(Math.random()*11),.7*i));
        circle = circles[circles.length-1];
    }
    for(i=0; i<circles.length; i++){
        draw_circle(circles[i]);
    }
    setInterval(function(){rotateCircles(circles);}, 8.7);

}
function draw_circle(circle){
    const radian = Math.PI/180;
    let c = document.getElementById("graph");
    let ctx = c.getContext("2d");
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    let i;
    ctx.translate(circle.centerX, circle.centerY);
    for(i=0; i<361; i++){
        ctx.lineTo((circle.radius*Math.cos(i*radian)), (circle.radius*Math.sin(i*radian)));
    }
    ctx.stroke();
    ctx.moveTo(0,0);
    ctx.lineTo((circle.radius*Math.cos(circle.rotation*radian)),circle.radius*Math.sin(circle.rotation*radian));
    ctx.stroke();
    ctx.translate(-circle.centerX,-circle.centerY);
}
