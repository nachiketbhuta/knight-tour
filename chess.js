var black = false, started = false, j = 0, count = 1;
var map = new Array(8);

for (var i = 0; i < map.length; i++) {
	map[i] = new Array(8);
}

var mapDraw = new Array(64);
var init = new Array(2);

var disp = [[2, 1], [1, 2], [-2, 1], [1, -2], [-2, -1], [-1, -2], [2, -1], [-1, 2]];
var calls = 0, size = map[0].length * map.length;

for (var i = 0; i < 64; i++) {
	var tile = document.getElementById("chessboard").appendChild(document.createElement("div"));
	tile.classList.add("tile");
	tile.setAttribute("id", i);
	//	tile.zIndex=5000;
	img = tile.appendChild(document.createElement("img"));
	img.classList.add("image");
	img.src = "knight1.png";
	img.style.display = "none";

	text = tile.appendChild(document.createElement("div"));
	text.classList.add("tag");

	if (black) {
		tile.classList.add("black");
	} else {
		tile.classList.add("white");
	}
	black = !black;
	j++;
	if (j > 7) {
		j = 0;
		black = !black;
	}

	tile.addEventListener("mousedown", function f(event) {
		console.log("click");
		if (event.target.classList.contains(".tile") !== null && !started) {
			var tag = event.target;
			if (tag !== null) {
			}
			var a = numToXY(parseInt(tag.id));
			console.log(a[0] + ", " + a[1]);
			move(a, 0);
			init[0] = a[0]; init[1] = a[1];
			started = true;
			//		img[0].style = 'inline';	
			//		started = true;
			//		event.target.querySelectorAll('.tag')[0].innerHTML = ""+count;
			//	markArray(event.target.id);
		} else if (started) {
			eraseAll();
			started = false;
			//			document.getElementById("nerdstuff").innerHTML="Click anywhere on the board.";	
		}
	});
}

document.getElementById("draw").addEventListener("mousedown", function f(event) {
	eraseAll();
	started = false;
});

document.getElementById("reset").addEventListener("mousedown", function f(event) {
	eraseAll();
	started = false;
});

var toggleP = false;
document.getElementById("path").addEventListener("mousedown", function f(event) {
	if (started) {
		if (!toggleP) {
			document.getElementById("draw").style.display = 'none';
		} else {
			document.getElementById("draw").style.display = 'block';
		}
		toggleP = !toggleP;
		console.log("toggle");
	}
});

var toggleT = false;
document.getElementById("knight").addEventListener("mousedown", function f(event) {
	if (started) {
		if (!toggleT) {
			for (var i = 0; i < 64; i++) {
				tileChildren = document.getElementById(i).childNodes;
				for (var j = 0; j < tileChildren.length; j++) {
					tileChildren[j].style.display = "none";
				}
			}
		} else {
			for (var i = 0; i < 64; i++) {
				tileChildren = document.getElementById(i).childNodes;
				for (var j = 0; j < tileChildren.length; j++) {
					tileChildren[j].style.display = "block";
				}
			}
		}
		toggleT = !toggleT;
		console.log("toggle");
	}
});

function numToXY(x) {
	c = 0;
	while (x > 7) {
		x = x - 8;
		c++;
	}
	var t = Array(2);
	t[0] = x;
	t[1] = c;
	return t;
}

function xyToNum(a) {
	i = (a[1]) * 8;
	i = i + a[0];
	return parseInt(i);
}

function draw(a, cnt) {

	console.log(a[0] + "," + a[1]);
	var i = xyToNum(a);
	var tile = document.getElementById(i);
	console.log("id: " + i);
	var img = tile.querySelectorAll('.image');
	if (img[0].style !== null) {
		img[0].style.display = 'block';
		tile.querySelectorAll('.tag')[0].innerHTML = "" + (cnt);
		tile.querySelectorAll('.tag')[0].style.display = "block";
	}
}

function erase(a) {
	var i = xyToNum(a);
	console.log("erase (" + a[0] + "," + a[1] + ") == id: " + i)
	var tile = document.getElementById(i);
	var img = tile.querySelectorAll('.image');
	if (img[0].style !== null) {
		img[0].style.display = 'none';
		tile.querySelectorAll('.tag')[0].innerHTML = "";
	}
	map[a[0]][a[1]] = 0;
}

function markArray(x) {
	c = 0;
	while (x > 7) {
		x = x - 8;
		c++;
	}
	map[c][x] = count;
	//	alert("Marked x: "+x+" y: "+c+" as "+map[c][x]);
	move([x, c], 0);
}

function sum(a, b) {
	return [a[0] + b[0], a[1] + b[1]];
}

function illegal(temp) { //determine if move is illegal

	var x = temp[0], y = temp[1];

	if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
		return true;
	} else if (map[x][y] > 0) {
		return true;
	}
	return false;
}

function options(temp) {
	var count = 0;
	for (var i = 0; i < disp.length; i++) {
		if (!illegal(sum(temp, disp[i])))
			count++;
	}
	//System.out.printf("(%d,%d) has %d options\n",temp[0],temp[1],count);
	return count;
}


function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}

function move(temp, cnt) {
	console.log(cnt);
	console.log(calls);

	//	document.getElementById("nerdstuff").innerHTML="Calls: "+calls+" Progress: "+cnt;	

	calls++;
	var x = temp[0], y = temp[1];
	if (illegal(temp)) {

		return false;

	} else {

		cnt++;
		map[x][y] = cnt;
		mapDraw[cnt] = xyToNum([x, y]);
		draw([x, y], cnt);

		if (cnt == size) {
			finale();
			return true;
		}

		var opts = analysis(temp);
		var optNum = opts[8];


		for (var i = 0; i < 8; i++) {
			if (opts[i] == optNum && move(sum(temp, disp[i]), cnt)) {
				return true;
			}
		}


		if (cnt > 0) {
			//could not solve condition?
			//step back, probably.
			map[x][y] = 0;
			mapDraw[cnt] = xyToNum([x, y]);
			erase([x, y]);
			return false;
		}
	}
}

//Warnsdorf Hueristic
function analysis(temp) {  //determine which future steps are valid (index line up with Displacement)

	var opts = new Array(9);   //every knight has 8 option moves. 9th index stores the opt number!
	var optNum = 9;     //the option number will never exceed 8

	for (var i = 0; i < 8; i++) {  // for each of these options

		if (!illegal(sum(temp, disp[i]))) {
			opts[i] = options(sum(temp, disp[i])); //find the number of options the current option has
			if (opts[i] < optNum) {      //identify the lowest option Number and record it
				optNum = opts[i];
			}
		}
	}
	opts[8] = optNum;
	return opts;
}

function drawAll() {
	for (var i = 0; i < tiles.length; i++) {
		if (tiles[i][2] == 0) {
			//			var a = [tiles[i][0],tiles[i][1]];
			var a = new Array(2);
			a[0] = tiles[i][0]; a[1] = tiles[i][0];
			console.log(a[0] + "," + a[1]);
			setTimeout(draw(a, i), 500);
		} else {
			setTimeout(erase(a), 500);
		}
	}
}

function eraseAll() {
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			erase([i, j]);
		}
	}
	count = 1;
	calls = 0;
	if (document.getElementById("tour")) {
		document.getElementById("draw").style.setProperty("z-index", "00", "important");//.setAttribute('z-index', '5000 !important');
		document.getElementById("tour").remove();
	}
}

function finale() {
	var cBoard = document.getElementById("draw");
	cBoard.style.setProperty("z-index", "1", "important");//.setAttribute('z-index', '5000 !important');
	var cBoardDim = document.getElementById("draw").getBoundingClientRect();
	var width = (cBoardDim['width']);
	var height = (cBoardDim['height']);
	var drawSVG = SVG('draw');//.size(cBoard['width'],cBoard['height']);
	var theSVG = cBoard.querySelectorAll("svg")[0];
	theSVG.id = "tour";
	//var polyline = drawSVG.polyline([[0,0], [width,0], [0,height]]).fill('none').stroke({ width: 9 });

	var drawArray = new Array(64);
	for (var i = 0; i < 64; i++) {
		drawArray[i] = new Array(2);
	}

	var offset = getOffset(cBoard);

	var points = " ";

	for (var i = 1; i < mapDraw.length; i++) {
		if (i > 1) {
			points += ",";
		}

		console.log(i, mapDraw[i]);
		var tile = document.getElementById(mapDraw[i] + "");

		var pos = tile;//.querySelectorAll("tile")[0];
		if (pos) {
			pos = pos.getBoundingClientRect();
			tileDim = tile.getBoundingClientRect();
			points += ((pos['left'] - offset.left + (pos['width'] / 2)) + "," + (pos['top'] - offset.top + (pos['height'] / 2)) + " ");
			console.log(pos['left'], pos['top']);
		}
	}
	console.log("plotting: " + points);
	var polyline = drawSVG.polyline(points).fill('none').stroke({ color: '#5B5', width: 4, linecap: 'round', linejoin: 'round' }).animate(2000, '>', 1000).attr({});
	console.log(cBoard.scrollTop);
}
/*
function getOffset(element)
{
  var bound = element.getBoundingClientRect();
  var html = document.documentElement;

  return {
    top: bound.top + window.pageYOffset - html.clientTop,
    left: bound.left + window.pageXOffset - html.clientLeft
  };
}*/

function getOffset(el) {
	var _x = 0;
	var _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}
