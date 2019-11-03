var board = [];
var n = 8;
var canvasSize = 600;
var started = false;

function drawBoard () {
  background(255);
  stroke(0);

  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j ++) {
      board[i] = board[i] || [];
      if(board[i][j] == -1) {
        fill(150, 0, 0);
      } else if(board[i][j] > 0) {
        fill(0, 150, 0);
      } else if((i + j) % 2 !== 0) {
        fill(0);
      } else {
        fill(255);
      }
      board[i][j] = new square(i, j, n, board);
      board[i][j].display();
    }
  }
}

function buildHeuristic() {
  for (var i = 0; i < n; i ++) {
    for (var j = 0; j < n; j ++) {
      board[i][j].calcHeuristic();
    }
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
}

function mousePressed() {
  var i = parseInt(mouseX / ((width - 50) / n)),
      j = parseInt(mouseY / ((height - 50) / n));
  board[i][j].clicked();
}

function draw() {
  background(255);

  drawBoard();

  if(!started) {
    started = true;
    buildHeuristic();
  }
}

