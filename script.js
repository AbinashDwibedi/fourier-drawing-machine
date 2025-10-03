
let canvas = document.getElementById("myCanvas");
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;
canvas.style.background = "black";
const ctx = canvas.getContext("2d");

const dft = (x) => {
  const N = x.length;
  let X = [];
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < N; n++) {
      re += x[n] * Math.cos(((2 * Math.PI) / N) * n * k);
      im += -(x[n] * Math.sin(((2 * Math.PI) / N) * n * k));
    }
    //normalizing dft otherwise its amplitude will imcrease with increase in value of N;
    re /= N;
    im /= N;

    let amp = Math.sqrt(re * re + im * im);
    let freq = k;
    let phase = Math.atan2(im, re);
    X[k] = { amp, freq, phase, re, im };
  }
  return X;
};

//to draw sin wave
// let N = 200;
// let amplitude = 100;
// let frequency = 1;
// let xSignal = [];
// let ySignal = [];

// for (let i = 0; i < N; i++) {
//     let t = (i / N) * (2 * Math.PI * frequency);
//     xSignal.push(i); 
//     ySignal.push(amplitude * Math.sin(t));
// }
//to draw ellipse
// let N = 100;
// let a = 150; // horizontal radius
// let b = 100; // vertical radius
// let xSignal = [];
// let ySignal = [];

// for (let i = 0; i < N; i++) {
//     let theta = (2 * Math.PI * i) / N;
//     xSignal.push(a * Math.cos(theta));
//     ySignal.push(b * Math.sin(theta));
// }
//to draw infiniti
// let xSignal = [];
// let ySignal = [];

// const N = 300; // Number of points, more = smoother curve
// const scale = 250; // Size of the symbol

// for (let i = 0; i < N; i++) {
//   const t = (2 * Math.PI * i) / N;
//   const denominator = 1 + Math.pow(Math.sin(t), 2);
  
//   const x = scale * Math.cos(t) / denominator;
//   const y = scale * Math.sin(t) * Math.cos(t) / denominator;
  
//   xSignal.push(x);
//   ySignal.push(y);
// }
//triang
let xSignal = [];
let ySignal = [];

// --- Signal Generation for a Celtic Trinity Knot ---
const N = 400; // Number of points for a smooth curve
const scale = 50; // Adjusts the overall size of the knot

for (let i = 0; i < N; i++) {
  // Angle 't' goes from 0 to 2*PI
  const t = (2 * Math.PI * i) / N;
  
  // Parametric equations to draw the Triquetra path
  const commonTerm = 3 + Math.cos(3 * t);
  const x = scale * Math.cos(t) * commonTerm;
  const y = scale * Math.sin(t) * commonTerm;
  
  // We push the points in reverse for a nice drawing direction, but it's optional
  xSignal.unshift(x);
  ySignal.unshift(y);
}


let wave = [];
let time = 0;

let fourierX = [];
let fourierY = [];
function setup(x, y) {
  fourierX = dft(x);
  fourierY = dft(y);
  console.log(fourierX, fourierY);
}

function drawEpicycles(startX, startY, fourier, horizontal) {
    let x,y;
  if (horizontal) {
    x = startX;
    y = 100;
  } else {
    x = 100;
    y = startY;
  }
// x = startX;
// y = startY;
  for (let i = 0; i < fourier.length; i++) {
    let prevX = x;
    let prevY = y;
    let radius = fourier[i].amp;
    let freq = fourier[i].freq;
    let phase = fourier[i].phase;
    if (horizontal) {
      x += radius * Math.cos(2 * Math.PI * freq * time + phase);
    } else {
      y += radius * Math.cos(2 * Math.PI * freq * time + phase);
    }
    ctx.lineWidth = 2;
    //drawing the epicycles
    ctx.beginPath();
    ctx.strokeStyle = "lime";
    ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    //vector
    ctx.beginPath();
    ctx.strokeStyle = "cyan";
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
  return { x, y };
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  let startX = w / 2;
  let startY = h / 2;

  let posX = drawEpicycles(startX, startY, fourierX, true);
  let posY = drawEpicycles(startX, startY, fourierY, false);
  wave.push({ x: posX.x, y:posY.y });
  ctx.beginPath();
  for (let j = 0; j < wave.length; j++) {
    ctx.lineTo(wave[j].x, wave[j].y);
  }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(posX.x, posX.y);
    ctx.lineTo(posX.x,posY.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();

        ctx.beginPath();
    ctx.moveTo(posY.x,posY.y);
    ctx.lineTo(posX.x,posY.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
  dt = (2*Math.PI)/fourierX.length;
  time += 0.01;
  // if (wave.length > 400) wave.shift();
  requestAnimationFrame(draw);
}

setup(xSignal, ySignal);
draw(fourierX, fourierY);
