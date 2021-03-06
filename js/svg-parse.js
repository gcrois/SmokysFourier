// Authors: Gregory Croisdale and John Carmack
// Turns SVG into a parametrized function

const DELTA = .1;

class C {
  constructor(curr_loc, param) {
    this.p0 = curr_loc;
    this.p1 = param[0];
    this.p2 = param[1];
    this.p3 = param[2];
  }
  val(t) {
    return (((1 - t) * (1 - t) * (1 - t) * this.p0) + 3 *  (1 - t) * (1 - t) * t * this.p1 + 3 * (1 - t) * t * t * this.p2 + t * t * t * this.p3);
  }
}

class L {
  constructor(curr_loc, param) {
    this.cl = curr_loc;
    this.p0 = param[0];
  }
  val(t) {
    return this.cl + (this.p0 - this.cl) * t;
  }
}

class M {
  constructor(curr_loc, param) {
  this.p0 = param[0];
  }
  val(t){
    return this.p0;
  }
}


// All svg commands
const SVG_COMMANDS = {
  M: M,
  m: "m",
  L: L,
  l: "l",
  H: "H",
  h: "h",
  V: "V",
  v: "v",
  // THESE ARE THE SAME
  // SPECIAL CASE Z: "z",
  Z: "Z",
  z: "z",
  // GETS COMPLICATED FROM HERE
  C: C,
  c: "c",
  S: "S",
  s: "s",
  Q: "Q",
  q: "q",
  T: "T",
  t: "t",
  A: "A",
  a: "a",
}


// contains a single path
class Path {
  constructor(input) {
    this.commands = input;
    this.curr_loc = {
      x: 0,
      y: 0,
    };
    this.origin = {
      x: 0,
      y: 0,
    };
    this.func = {
      x: [],
      y: [],
    };

    // Creates parametrizations from commands
    // loops through each command
    for (let i = 0; i < this.commands.length; i++) {
      // special case for Z
      if (this.commands[i].type == 'Z') {
        this.func.y[i] = new L(this.curr_loc.y, [this.origin.y]);
        this.func.x[i] = new L(this.curr_loc.x, [this.origin.x]);
        continue;
      }
      // finds cooresponding parametrization
      let parameters = this.commands[i].p;
      let x_func = new SVG_COMMANDS[this.commands[i].type](this.curr_loc.x, parameters["x"])
      let y_func = new SVG_COMMANDS[this.commands[i].type](this.curr_loc.y, parameters["y"])
      // defines parametrization for certain time
      this.func.y[i] = y_func;
      this.func.x[i] = x_func;
      // sets current location for next command's use
      this.curr_loc["x"] = x_func.val(1);
      this.curr_loc["y"] = y_func.val(1);
      // saves first location for z command
      if (i == 0) {
        this.origin.x = this.curr_loc.x;
        this.origin.y = this.curr_loc.y;
      }
    }

}

  // plots already existing equations
  plot_equation() {
    let c = document.getElementById('plot');
    let ctx = c.getContext("2d");
    ctx.translate(0,0);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    for (let i = 0; i < this.func.y.length; i++) {
      let x = [];
      let y = [];
      for (let j = 0; j < 1; j += DELTA) {
        let x_p = this.func["x"][i].val(j);
        let y_p = this.func["y"][i].val(j);
        x.push(x_p);
        y.push(y_p);
        ctx.lineTo(x_p, y_p);
        ctx.stroke();
      }
    }
  }
}

// Each a step in the path
class Command {
  // Sets type and defaults to tmp parameter string and number array
  constructor(type) {
    this.type = type;
    this.param = "";  // all numbers
    this.p = {        // numbers as numbers
      x: [],
      y: [],
    }
  }

  // turns string of all numbers into individual numbers
  separate() {
    this.param = this.param.replace(/,/g, " ");
    this.param = this.param.replace(/-/g, " -");
    let no_space = this.param.split(" ");
    let nums = no_space.filter(isEmpty);

    // turns strings into float
    for (var i = 0; i < nums.length; i++) {
      if (i % 2 == 1) {
        this.p["y"][Math.floor(i / 2)] = parseFloat(nums[i]);
      }
      else {
        this.p["x"][Math.floor(i / 2)] = parseFloat(nums[i]);
      }
    }
  }
}

// asks user for AVG path
function ask() {
  let  user_input  = prompt("Please enter an SVG Path", "");
  return user_input;
}

// parses a string via unique delimters
function parse(str, delimiters = SVG_COMMANDS) {
  let parsed = [];
  let curr_elem = -1;
  for (var i = 0; i < str.length; i++) {
    let curr_char = str.charAt(i);
    if (curr_char in SVG_COMMANDS) {
      parsed[++curr_elem] = new Command(curr_char);
    }
    else {
      parsed[curr_elem].param += curr_char;
    }
  }
  let all_commands = [];
  for (var i = 0; i < parsed.length; i++) {
    parsed[i].separate();
    all_commands[i] = parsed[i];
  }
  o_ret = new Path(all_commands);
  return o_ret;
}

function print_curve(input) {
  for (let i = 0; i < input.commands.length; i++) {
    console.log(input.commands[i].p);
  }
}

// COMMAND FUNCTIONS:
function isEmpty(char) {
  return (!(char == ""));
}
