const SVG_COMMANDS = {
  C: "C",
  c: "c",
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
}

class Command {
  constructor(type) {
    this.type = SVG_COMMANDS[type];
    this.param = "";
  }
}

function ask() {
  let  user_input  = prompt("Please enter an SVG Path", "");
  return user_input;
}

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
      console.log(parsed[i].param);
  }
}
