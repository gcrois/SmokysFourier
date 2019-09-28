// Authors: Gregory Croisdale and John Carmack
// Turns SVG into a parametrized function

// All svg commands
const DELTA = .1;
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
    }
    this.func = {
      x: [],
      y: [],
    };
  }
  create_equation() {
    for (let i = 0; i < this.commands.length; i++) {
      if (this.commands[i].type == 'Z') {
        this.func.y[i] = L(this.curr_loc.y, [this.origin.y]);
        this.func.x[i] = L(this.curr_loc.x, [this.origin.x]);
        console.log("TESTTEST");
        continue;
      }
      let parameters = this.commands[i].p;
      console.log("x");
      let x_func = SVG_COMMANDS[this.commands[i].type](this.curr_loc.x, parameters["x"])
      console.log("y");
      let y_func = SVG_COMMANDS[this.commands[i].type](this.curr_loc.y, parameters["y"])
      this.func.y[i] = y_func;
      this.func.x[i] = x_func;
      this.curr_loc["x"] = x_func(1);
      this.curr_loc["y"] = y_func(1);
      if (i == 0) {
        this.origin.x = this.curr_loc.x;
        this.origin.y = this.curr_loc.y;
      }
    }
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
        let x_p = this.func["x"][i](j);
        let y_p = this.func["y"][i](j);
        x.push(x_p);
        y.push(y_p);
        ctx.lineTo(x_p, y_p);
        ctx.stroke();
      }
    }
    function sum_x(t) {
      total = 0;
      for (let i = 0; i < this.func.x.length; i++) {
        total += this.func.x[i](t);
      }
      return total;
    }
    function sum_y(t) {
      total = 0;
      for (let i = 0; i < this.func.y.length; i++) {
        total += this.func.y[i](t);
      }
      return total;
    }
    return {x: sum_x, y: sum_y}
  }
}

// Each a step in the path
class Command {
  // Sets type and defaults to tmp parameter string and number array
  constructor(type) {
    this.type = type;
    this.param = "";  // all numbers
    this.nums = [""]; // numbers separated as strings
    this.p = {
      x: [],
      y: [],
    }                 // numbers as numbers
  }

  // turns string of all numbers into individual numbers
  separate() {
    this.param = this.param.replace(/,/g, " ");
    this.param = this.param.replace(/-/g, " -");
    let no_space = this.param.split(" ");
    this.nums = no_space.filter(isEmpty);

    // turns strings into float
    for (var i = 0; i < this.nums.length; i++) {
      if (i % 2 == 1) {
        this.p["y"][Math.floor(i / 2)] = parseFloat(this.nums[i]);
      }
      else {
        this.p["x"][Math.floor(i / 2)] = parseFloat(this.nums[i]);
      }

    }
    console.log(this.p)

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
    let out = parsed[i].type + ": ";
    parsed[i].separate();
    all_commands[i] = parsed[i];
    for (var j = 0; j < parsed[i].nums.length; j++) {
        out += (parsed[i].p[j] + " ");
    }
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

function C(curr_loc, param) {
  return (t, p0 = curr_loc, p1 = param[0], p2 = param[1], p3 = param[2]) => { return (((1 - t) * (1 - t) * (1 - t) * p0) + 3 *  (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3) };
}

function c(curr_loc, param) {
  C(curr_loc, param.map(x => curr_loc + x));
}

function M(curr_loc, param) {
  return (t, p0 = param[0]) => { return p0 }
}

function L(curr_loc, dest) {
  console.log("curr_loc: " + curr_loc)
  console.log("dest: " + dest)
  return (t, p0 = dest[0]) => { return curr_loc + (dest[0] - curr_loc) * t;}
}

function isEmpty(char) {
  return (!(char == ""));
}
