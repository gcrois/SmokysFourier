const INT_PRECISION = 50;

class piecewise {
  constructor(commands) {
    this.commands = commands;
    this.d_x = (2 * Math.PI) / commands.x.length;
  }
  x(t) {
    let f_num = 0;
    t /= this.d_x;
    while (t > 1) {
      f_num++;
      t--;
    }
    if (f_num > this.commands.x.length) {
      f_num = 0;
    }
    return this.commands.x[f_num].val(t);
  }
  y(t) {
    let f_num = 0;
    t /= this.d_x;
    while (t > 1) {
      f_num++;
      t--;
    }
    if (f_num > this.commands.x.length) {
      f_num = 0;
    }
    return this.commands.y[f_num].val(t);
  }
}

function integrate(funn, circle, start=0, end=2*Math.PI, n=INT_PRECISION) {
  let our_input = new piecewise(funn);
  let area_x = 0;
  let area_y = 0;
  let d_x = ((end - start) / n);
  for (let c = 0; c < n; c++) {
    let i = start + (c * d_x);
    area_x += (our_input.x(i) * (Math.exp(-i * circle)) * d_x);
  }
  for (let c = 0; c < n; c++) {
    let i = start + (c * d_x);
    area_y += (our_input.y(i) * (Math.exp(-i * circle)) * d_x);
  }
  return {x: 1/end * area_x, y: 1/end * area_y}
}

function getCoeff(funn, n_circles){
  let circles = [];
  for (let c = 1; c < n_circles; c++) {
    let fancy_c = Math.floor(c / 2) * (-1) ** c;
    let tmp = integrate(funn, fancy_c);
    let x = tmp.x;
    let y = tmp.y;
    let radius = Math.sqrt(x ** 2 + y ** 2);
    let centerX = (x);
    let centerY = (y);
    let rotation = 0;
    let speed = fancy_c;
    let new_circ = new Circle(radius, centerX, centerY, rotation, speed);
    circles.push(new_circ);
  }
  return circles;
}

function parseCircles(circles) {
  let out = [];
  let anchor_x = circles[0].centerX;
  let anchor_y = circles[0].centery;
  for (let i = 1; i < circles.length - 1; i++) {
    let tmp = new Circle();
    let reach_x = circles[i].centerX;
    let reach_y = circles[i].centerY;

    tmp.centerX = circles[i - 1].centerX;
    tmp.centerY = circles[i - 1].centerY;

    tmp.radius = Math.sqrt((reach_x - tmp.centerX) ** 2 + (reach_y - tmp.centerY) ** 2);

    tmp.rotation = Math.atan((reach_y - tmp.centerY),(reach_x - tmp.centerX));
    tmp.speed = circles[i].speed;
    console.log(tmp);
    out.push(tmp);
  }
  return out;
}
