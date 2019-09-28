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

let rainbowIt=0;
let rainbowTrack = -1;
function makeRainbow(){
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    rainbowTrack++;
    if(rainbowTrack == colors.length){
        rainbowTrack=0;
    }
    return colors[rainbowTrack];
}

let oldX;
let oldY;
let colorChoice;
let shapeChoice;
function draw_vector(x,y){
    let c = document.getElementById("graph2");
    let ctx=c.getContext("2d");
    ctx.lineWidth = "1";

    if(colorChoice == "Rainbow"){
        if(rainbowIt < 200){
            rainbowIt++;
        }else{
            rainbowIt=0;
            ctx.beginPath();
            ctx.lineTo(oldX,oldY);
            ctx.strokeStyle= makeRainbow();
        }
    }
    ctx.lineTo(x,y);
    oldX=x;oldY=y;
    ctx.stroke();
}

function readInput(){
    if(document.getElementById("Circle").checked==true){
        shapeChoice = "Circle";
    }else if(document.getElementById("MLG").checked == true){
        shapeChoice = "MLG";
    }else if(document.getElementById("Square").checked == true){
        shapeChoice = "Square";
    }else if(document.getElementById("Triangle").checked == true){
        shapeChoice = "Triangle";
    }else if(document.getElementById("Volhacks").checked == true){
        shapeChoice = "Volhacks";
    }else if(document.getElementById("Custom").checked == true){
        shapeChoice = prompt("Jesus can nut in my asshole", "god please");
    }else{
        shapeChoice = "None";
    }
    if(document.getElementById("Red").checked==true){
        colorChoice="red";
    }else if(document.getElementById("Green").checked == true){
        colorChoice="green";
    }else if(document.getElementById("Blue").checked==true){
        colorChoice="blue";
    }else if(document.getElementById("Rainbow").checked == true){
        colorChoice="Rainbow";
    }else if(document.getElemnetById("Black").checked == true){
        colorChoice="black";
    }else if(document.getElementById("Pink").checked == true){
        colorChoice="pink";
    }else{
        colorChoice="None";
    }
    if(shapeChoice!= "None" && colorChoice!= "None" ){
        return true;
    }else{
        return false;
    }
}

//re is x, im is y
let arrI=1;
function radiusCalc(alex){
    let temp = Math.sqrt((alex[arrI].re - alex[arrI-1].re)**2 + (alex[arrI].im - alex[arrI-1].im)**2);

    return temp;
}

function setup(){
    if(!readInput()){
        return;
    }
    let alex = parseFile(shapeChoice);
    console.log(alex);
    let c = document.getElementById("graph2");
    let ctx=c.getContext("2d");
    ctx.beginPath();
    if(colorChoice != "Rainbow"){
        ctx.strokeStyle = colorChoice;
    }else{
        ctx.strokeStyle= makeRainbow();
    }
    let i;
    let circles = [];
    let circle;
    console.log(alex);
    const radian = Math.PI/180;
    let radius = radiusCalc(alex);
    if(radius < 0){
        circles.push(new Circle(radius*-1, alex[arrI-1].re+750, alex[arrI-1].im+300, 180,.5));
    }else{
        circles.push(new Circle(radius, alex[arrI-1].re+750, alex[arrI-1].im+300, 0,.5));
    }
    arrI++;
    circle = circles[0]
    for(i=2; i<alex.length; i++){
        radius = radiusCalc(alex);
        if(radius <0){
            circles.push(new Circle(radius*-1, (circle.centerX+circle.radius*Math.cos(circle.rotation*radian)), (circle.centerY+circle.radius*Math.sin(circle.rotation*radian)), 180,i*.5));
        }else{
            circles.push(new Circle(radius, (circle.centerX+circle.radius*Math.cos(circle.rotation*radian)), (circle.centerY+circle.radius*Math.sin(circle.rotation*radian)), 0,i*.5));
        }
        circle = circles[circles.length-1];
        arrI++;
    }
    for(i=1; i<circles.length; i++){
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
