/*function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  ellipseMode(CENTER);
  rectMode(CENTER);

  // Body
  fill(255, 0, 0);
  rect(240, 145, 20,100);

  // Head
  ellipse (240, 115, 60, 60);

  //Eyes

  fill(0, 255, 0);
  ellipse(221, 115, 16, 32);
  ellipse(259, 115, 16, 32);

  // Legs
  line(230, 195, 220, 205);
  line(250, 195, 260, 205);
}*/
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(255);
  stroke(0);
  var n = 8;
  //rect(0, 0, width - 8, height - 8);

  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j ++) {
      if ((i + j) % 2 !== 0) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * width / n, j * height / n, width / n, height / n);
    }
  }
}
