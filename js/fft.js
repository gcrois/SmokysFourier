const GLOB_N = 10;

function fft(func, N) {
  // calc a0, empty array for trig functions
  let cos_coeff = [];
  let sin_coeff = [];
  let a0 = (1/Math.PI) * integral(func,-Math.PI, Math.PI);

  // create an
  function f_cos(x) {
    return func(x) * Math.cos(x);
  }
  function an (n) {
    return (1/Math.PI) * integral(f_cos,-Math.PI, Math.PI, n);
  }

  // create bn
  function f_sin(x) {
    return func(x) * Math.sin(x);
  }
  function bn (n) {
    console.log(integral(f_sin,-Math.PI, Math.PI, n));
    return (1/Math.PI) * integral(f_sin,-Math.PI, Math.PI, n);
  }

  // find each iteration of series
  for (var n = 1; n < N; n++) {
    cos_coeff.push(an(n));
    sin_coeff.push(bn(n));
  }
  return {start: a0 / 2, cos: cos_coeff, sin: sin_coeff};
}


// calculates the definite integral of a function using
// trapezoidal approximation
function integral(func, start, end, mult=1, n=GLOB_N) {
  let area = 0;
  let d_x = ((end - start) / n);
  for (let c = 0; c < n; c++) {
    let i = start + (c * d_x);
    area += .5 * (func(i * mult) + func((i + d_x) * mult)) * d_x;
  }
  return area;
}

function test_y(t) {
  return Math.sin(t);
}

function test_x(t) {
  return Math.cos(t);
}
