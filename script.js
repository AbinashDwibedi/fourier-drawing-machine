// const canvas = document.getElementById("drawCanvas");
// const context = canvas.getContext("2d");

// const width = window.innerWidth;
// const height = window.innerHeight;

// canvas.width = width;
// canvas.height = height;
// canvas.style.backgroundColor = "white";

// let line_color = "black";
// let line_width = 5;
// let is_drawing = false;
// let drawArray = [];
// let index = -1;
// let removedArray = [];
// let removedArrayIndex = -1;

// canvas.addEventListener("mousedown", start, false);
// canvas.addEventListener("mousemove", draw, false);
// canvas.addEventListener("touchstart", start, false);
// canvas.addEventListener("touchmove", draw, false);
// canvas.addEventListener("touchend", end, false);
// canvas.addEventListener("mouseup", end, false);
// canvas.addEventListener("mouseout", end, false);

// function getCoordinates(event) {
//   if (event.type.includes("touch")) {
//     const touch = event.touches[0] || event.changedTouches[0];
//     return {
//       x: touch.clientX - canvas.offsetLeft,
//       y: touch.clientY - canvas.offsetTop
//     };
//   } else {
//     return {
//       x: event.clientX - canvas.offsetLeft,
//       y: event.clientY - canvas.offsetTop
//     };
//   }
// }
// let allPoints = []; // stores all points from drawing
// let currentStroke = []; // stores points of current stroke

// function start(event) {
//   is_drawing = true;
//   currentStroke = []; // reset stroke
//   context.beginPath();
//   const { x, y } = getCoordinates(event);
//   currentStroke.push({ x, y });
//   context.moveTo(x, y);
//   event.preventDefault();
// }

// function draw(event) {
//   if (is_drawing) {
//     removedArray = [];
//     removedArrayIndex = -1;
//     const { x, y } = getCoordinates(event);
//     currentStroke.push({ x, y }); // store stroke points
//     context.lineTo(x, y);
//     context.lineWidth = line_width;
//     context.strokeStyle = line_color;
//     context.lineCap = "round";
//     context.lineJoin = "round";
//     context.stroke();
//     event.preventDefault();
//   }
// }

// function end(event) {
//   if (is_drawing) {
//     is_drawing = false;
//     context.closePath();
//     allPoints.push([...currentStroke]); // save stroke
//   }
//   event.preventDefault();
//   if (event.type != "mouseout") {
//     drawArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
//     index += 1;
//   }
// }

// // NEW FUNCTION
// function getPoints() {
//   let xcor = [];
//   let ycor = [];
//   allPoints.forEach(stroke => {
//     stroke.forEach(pt => {
//       xcor.push(pt.x);
//       ycor.push(pt.y);
//     });
//   });
//   return { xcor, ycor };
// }

// function selectColor(element) {
//     line_color = element.style.backgroundColor;
//   }
// function undoLast() {
//   if (index <= 0) {
//     clearCanvas();
//   } else {
//     removedArray.push(drawArray[index]);
//     removedArrayIndex += 1;
//     index -= 1;
//     drawArray.pop();
//     context.putImageData(drawArray[index], 0, 0);
//   }
// }

// function redoLast() {
//   if (removedArrayIndex > -1) {
//     drawArray.push(removedArray[removedArrayIndex]);
//     index += 1;
//     removedArray.pop();
//     removedArrayIndex -= 1;
//     context.putImageData(drawArray[index], 0, 0);
//   }
// }

// function clearCanvas(element) {
//   context.clearRect(0, 0, width, height);
//   drawArray = [];
//   index = -1;
// }

// function showHide() {
//   document.getElementById("widthRange").classList.toggle("show");
// }

// function changeColor(element) {
//   line_color = element.value;
//   document.querySelector(".fa-droplet").style.color = element.value;
// }

// window.addEventListener("resize", () => {
//   location.reload();
// });

// function initDownload() {
//   let vals = getPoints();
//   drawImage(vals.xcor,vals.ycor,context)
//   const dataURL = canvas.toDataURL("image/png");
//   const link = document.createElement("a");
//   link.href = dataURL;
//   link.download = "canvas-drawing.png";
//   link.click();
// }














// function drawImage(xCor,yCor,ctx){

// let w = width;
// let h = height;

// const dft = (x) => {
//   const N = x.length;
//   let X = [];
//   for (let k = 0; k < N; k++) {
//     let re = 0,
//       im = 0;
//     for (let n = 0; n < N; n++) {
//       re += x[n] * Math.cos(((2 * Math.PI) / N) * n * k);
//       im += -(x[n] * Math.sin(((2 * Math.PI) / N) * n * k));
//     }
//     //normalizing dft otherwise its amplitude will imcrease with increase in value of N;
//     re /= N;
//     im /= N;

//     let amp = Math.sqrt(re * re + im * im);
//     let freq = k;
//     let phase = Math.atan2(im, re);
//     X[k] = { amp, freq, phase, re, im };
//   }
//   return X;
// };


// let xSignal = xCor;
// let ySignal = yCor;
// let N = xCor; 
// // let scale;


// let wave = [];
// let time = 0;

// let fourierX = [];
// let fourierY = [];
// function setup(x, y) {
//   fourierX = dft(x);
//   fourierY = dft(y);
//   fourierX.sort((a, b) => b.amp - a.amp);
//   fourierY.sort((a, b) => b.amp - a.amp);
//   console.log(fourierX, fourierY);
// }

// function drawEpicycles(startX, startY, fourier, horizontal) {
//     let x,y;
//   if (horizontal) {
//     x = startX;
//     y = 100;
//   } else {
//     x = 100;
//     y = startY;
//   }
// // x = startX;
// // y = startY;
//   for (let i = 0; i < fourier.length; i++) {
//     let prevX = x;
//     let prevY = y;
//     let radius = fourier[i].amp;
//     let freq = fourier[i].freq;
//     let phase = fourier[i].phase;
//     if (horizontal) {
//       x += radius * Math.cos(freq * time + phase);
//     } else {
//       y += radius * Math.cos(freq * time + phase);
//     }
//     ctx.lineWidth = 2;
//     //drawing the epicycles
//     ctx.beginPath();
//     ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
//     ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.closePath();

//     //vector
//     ctx.beginPath();
//     ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
//     ctx.moveTo(prevX, prevY);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.closePath();
//   }
//   return { x, y };
// }
// function draw() {
//   ctx.clearRect(0, 0, w, h);
//   let startX = w / 4;
//   let startY = h / 4;

//   let posX = drawEpicycles(startX, startY, fourierX, true);
//   let posY = drawEpicycles(startX, startY, fourierY, false);
//   wave.push({ x: posX.x, y:posY.y });
//   ctx.beginPath();
//   for (let j = 0; j < wave.length; j++) {
//     ctx.lineTo(wave[j].x, wave[j].y);
//   }

//     ctx.strokeStyle = "red";
//     ctx.lineWidth = 5;
//     ctx.stroke();
//     ctx.closePath();

//     ctx.lineWidth = 2;
//     ctx.beginPath();
//     ctx.moveTo(posX.x, posX.y);
//     ctx.lineTo(posX.x,posY.y);
//     ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
//     ctx.stroke();
//     ctx.closePath();

//         ctx.beginPath();
//     ctx.moveTo(posY.x,posY.y);
//     ctx.lineTo(posX.x,posY.y);
//     ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
//     ctx.stroke();
//     ctx.closePath();
//   dt = (2*Math.PI)/fourierX.length;
//   time += dt;
//   if (time > 2*Math.PI) {
//     time = 0;
//     wave=[];
//   };
//   requestAnimationFrame(draw);
// }

// setup(xSignal, ySignal);
// draw(fourierX, fourierY);

// }

const canvas = document.getElementById("drawCanvas");
const context = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.backgroundColor = "white";

let line_color = "black";
let line_width = 5;
let is_drawing = false;
let drawArray = [];
let index = -1;
let removedArray = [];
let removedArrayIndex = -1;

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", end, false);
canvas.addEventListener("mouseup", end, false);
canvas.addEventListener("mouseout", end, false);

function getCoordinates(event) {
  if (event.type.includes("touch")) {
    const touch = event.touches[0] || event.changedTouches[0];
    return {
      x: touch.clientX - canvas.offsetLeft,
      y: touch.clientY - canvas.offsetTop
    };
  } else {
    return {
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop
    };
  }
}
let allPoints = []; // stores all points from drawing
let currentStroke = []; // stores points of current stroke

function start(event) {
  is_drawing = true;
  currentStroke = []; // reset stroke
  context.beginPath();
  const { x, y } = getCoordinates(event);
  currentStroke.push({ x, y });
  context.moveTo(x, y);
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    removedArray = [];
    removedArrayIndex = -1;
    const { x, y } = getCoordinates(event);
    currentStroke.push({ x, y }); // store stroke points
    context.lineTo(x, y);
    context.lineWidth = line_width;
    context.strokeStyle = line_color;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    event.preventDefault();
  }
}

function end(event) {
  if (is_drawing) {
    is_drawing = false;
    context.closePath();
    allPoints.push([...currentStroke]); // save stroke
  }
  event.preventDefault();
  if (event.type != "mouseout") {
    drawArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

// NEW FUNCTION
function getPoints() {
  let xcor = [];
  let ycor = [];
  allPoints.forEach(stroke => {
    stroke.forEach(pt => {
      xcor.push(pt.x);
      ycor.push(pt.y);
    });
  });
  return { xcor, ycor };
}

function selectColor(element) {
    line_color = element.style.backgroundColor;
  }
function undoLast() {
  if (index <= 0) {
    clearCanvas();
  } else {
    removedArray.push(drawArray[index]);
    removedArrayIndex += 1;
    index -= 1;
    drawArray.pop();
    context.putImageData(drawArray[index], 0, 0);
  }
}

function redoLast() {
  if (removedArrayIndex > -1) {
    drawArray.push(removedArray[removedArrayIndex]);
    index += 1;
    removedArray.pop();
    removedArrayIndex -= 1;
    context.putImageData(drawArray[index], 0, 0);
  }
}

function clearCanvas(element) {
  context.clearRect(0, 0, width, height);
  drawArray = [];
  index = -1;
}

function showHide() {
  document.getElementById("widthRange").classList.toggle("show");
}

function changeColor(element) {
  line_color = element.value;
  document.querySelector(".fa-droplet").style.color = element.value;
}

window.addEventListener("resize", () => {
  location.reload();
});

function initDownload() {
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "canvas-drawing.png";
  link.click();
}



function drawImage(){
  let vals = getPoints();
  let xCor = vals.xcor;
  let yCor = vals.ycor;
  let newWin = window.open("","_blank",`width = ${screen.width}, height = ${screen.height}`);
  newWin.document.write(`
    <html>
      <head>
        <title>Fourier Drawing</title>
        <style>
          body { margin: 0; background: black; overflow: hidden; }
          canvas { display: block; }
        </style>
      </head>
      <body>
        <canvas id="myCanvas"></canvas>
      </body>
    </html>
    `)
let canvas = newWin.document.getElementById("myCanvas");
let w = newWin.innerWidth;
let h = newWin.innerHeight;
canvas.width = w;
canvas.height = h;
canvas.style.background = "black";
const ctx = canvas.getContext("2d");
newWin.addEventListener("resize",()=>{
  w = newWin.innerWidth;
h = newWin.innerHeight;
canvas.width = w;
canvas.height = h;
})
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


let xSignal = xCor;
let ySignal = yCor;
let N = xCor; 
// let scale;


let wave = [];
let time = 0;

let fourierX = [];
let fourierY = [];
function setup(x, y) {
  fourierX = dft(x);
  fourierY = dft(y);
  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
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
      x += radius * Math.cos(freq * time + phase);
    } else {
      y += radius * Math.cos(freq * time + phase);
    }
    ctx.lineWidth = 2;
    //drawing the epicycles
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    //vector
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
  return { x, y };
}
function draw() {
  ctx.clearRect(0, 0, w, h);
  let startX = w / 4;
  let startY = h / 4;

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
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.stroke();
    ctx.closePath();

        ctx.beginPath();
    ctx.moveTo(posY.x,posY.y);
    ctx.lineTo(posX.x,posY.y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.stroke();
    ctx.closePath();
  dt = (2*Math.PI)/fourierX.length;
  time += dt;
  if (time > 2*Math.PI) {
    time = 0;
    wave=[];
  };
  requestAnimationFrame(draw);
}

setup(xSignal, ySignal);
draw(fourierX, fourierY);

}