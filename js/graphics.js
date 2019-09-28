function setup(){
    draw_circle(50, 300, 300);
    draw_circle(40, 200, 200);
    draw_circle(30, 100, 100);
}
function draw_circle(radius, centerX, centerY){
    const radian = Math.PI/180;
    let c = document.getElementById("graph");
    let ctx = c.getContext("2d");
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    let i;
    ctx.translate(centerX, centerY);
    for(i=0; i<361; i++){
        ctx.lineTo((radius*Math.cos(i*radian)), (radius*Math.sin(i*radian)));
    }
    ctx.stroke();
    ctx.translate(-centerX,-centerY);
}
