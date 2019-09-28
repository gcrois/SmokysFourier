class Circle{
    constructor(radius, centerX, centerY, rotation){
        this.radius = radius;
        this.centerX = centerX;
        this.centerY = centerY;
        this.rotation = rotation;
    }
    rotatePrimary(){
        let delta = 10;
        this.rotation += delta;
    }
    rotateSecondary(circle){
        let delta = 10;
        this.rotation += delta;
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
}

function clearGraph(){
    let c = document.getElementById("graph");
    let ctx=c.getContext("2d");
    ctx.clearRect(0,0,600,600);
}

function setup(){
    let i;
    let circles = [];
    let circle;
    const radian = Math.PI/180;
    circles.push(new Circle(50, 300, 300, 6));
    circle = circles[0];
    for(i=4; i>=0; i--){
        console.log(circle.centerX + " " +circle.centerY);
        circles.push(new Circle(i*10, (circle.centerX+circle.radius*Math.cos(circle.rotation*radian)), (circle.centerY+circle.radius*Math.sin(circle.rotation*radian)), i*6));
        circle = circles[circles.length-1];
    }
    for(i=0; i<5; i++){
        draw_circle(circles[i]);
    }
    for(i=0; i<5; i++){
        setTimeout(function(){rotateCircles(circles);}, (i+1)*1000);
    }
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
