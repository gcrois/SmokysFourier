// Authors: Gregory Croisdale and John Carmack
// Turns SVG into a parametrized function


// All svg commands
const SVG_COMMANDS = {
  M: "M",
  m: "m",
  L: "L",
  l: "l",
  H: "H",
  h: "h",
  V: "V",
  v: "v",
  // THESE ARE THE SAME
  Z: "z",
  z: "z",
  // GETS COMPLICATED FROM HERE
  C: "C",
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

// Each a step in the path
class Command {
  // Sets type and defaults to tmp parameter string and number array
  constructor(type) {
    this.type = SVG_COMMANDS[type];
    this.param = "";  // all numbers
    this.nums = [""]; // numbers separated as strings
    this.p = []       // numbers as numbers
  }

  // turns string of all numbers into individual numbers
  separate() {
    let curr_num = 0;
    for (var i = 0; i < this.param.length; i++) {
      var curr_char = this.param[i];
      if (curr_char == '-') {
        if (i != 0) {
          this.nums[++curr_num] = "";
        }
        this.nums[curr_num] += curr_char;
      }
      else if (curr_char == ',' || curr_char == ' ') {
        this.nums[++curr_num] = "";
      }
      else {
        this.nums[curr_num] += curr_char;
      }
    }

    // turns strings into float
    for (var i = 0; i < this.nums.length; i++) {
      this.p[i] = parseFloat(this.nums[i]);
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
  for (var i = 0; i < parsed.length; i++) {
    let out = parsed[i].type + ": ";
    parsed[i].separate();
    for (var j = 0; j < parsed[i].nums.length; j++) {
        out += (parsed[i].p[j] + " ");
    }
    console.log(out);
  }
}
