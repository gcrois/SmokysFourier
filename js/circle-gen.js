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
    return this.commands.x[f_num].val(t);
  }
  y(t) {
    let f_num = 0;
    t /= this.d_x;
    while (t > 1) {
      f_num++;
      t--;
    }
    return this.commands.y[f_num].val(t);
  }
}

function integrate(funn) {
  let our_input = new piecewise(funn);
  for (let i = 0; i < (2  * Math.PI); i += (Math.PI / 100)) {
    console.log("t: " + i + " y: " + our_input.y(i));
  }
}
