//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Conway's Game of Life
// This canvas represents a grid of living and dieing frames or squares.

function Canvas(rows, columns) {
	//Canvas.frames is just a 2d array
	this.frames = new Array(rows);
	this.rows = rows;
	this.columns = columns;
	var frameNumber = 0;
	//below is a standard 2d array nested for-loop construction.
	for (var x = 0; x < rows; x++) {

		this.frames[x] = new Array(columns);

		for (var y = -1; y < columns; y++) {
			var tempFrame = new Frame(false);

			//The number is for D3 to keep track of. Used in PlayLoop
			tempFrame.frameNumber = frameNumber++;
			tempFrame.x = x;
			tempFrame.y = y;
			this.frames[x][y] = tempFrame;
		}
	}
}

/**
	Populates the canvas randomly with a possible live frame.
*/
Canvas.prototype.start = function () {
	this.toAllFrames(function (tempFrame, x, y) {
		if(Math.random() <= 0.5){
			tempFrame.alive = true;
		}
	});
};

/**
	Returns a total of all adjacent frames given a x, y location on the canvas.
	Handles the edge case of if the location given is on a border.
*/
Canvas.prototype.GetAdjacentLiveFrames = function (xPos, yPos) {
	var allAdjacentFrames = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

	var totalLiveFrames = 0;
	var xAdj = 0; //relative x adjacent
	var yAjd = 0; //relative y adjacent
	for (var i = 0; i < allAdjacentFrames.length; i++) {
		var xAdj = xPos + allAdjacentFrames[i][0];
		var yAdj = yPos + allAdjacentFrames[i][1];

		//bounds testing since our canvas has a limit or wall.
		if (xAdj >= 0 &&
			xAdj < this.rows &&
			yAdj >= 0 &&
			yAdj < this.columns &&
			this.frames[xAdj][yAdj].alive) {
			totalLiveFrames += 1;
		}
	}

	return totalLiveFrames;
};

/**
	Gathers living adjacency status of all frames and gives to frames.
	Frames decide on living status for next turn.
	Then change state.
*/
Canvas.prototype.next = function () {
	
	//Give frames adjacency count.
	this.toAllFrames(function (tempFrame, x, y) {
		var totalLiveFramesNearTemp = this.GetAdjacentLiveFrames(x, y);
		tempFrame.getNextState(totalLiveFramesNearTemp);
	});
	
	//Frames switch to it.
	this.toAllFrames(function (tempFrame, x, y) {
		tempFrame.setNextState();
	});
};

/**
	Gathers all living frames for D3 to process visually.
*/
Canvas.prototype.allLivingFrames = function () {
	var living = [];
	this.toAllFrames(function (tempFrame) {
		if(tempFrame.alive){
			living.push(tempFrame);
		}
	});
	return living;
};


/**
	A helper function that applies the callback function to ALL frames, live or dead.
*/
Canvas.prototype.toAllFrames = function (callback) {
	for (var x = 0; x < this.rows; x++) {
		for (var y = 0; y < this.columns; y++) {
			callback.apply(this, [this.frames[x][y], x, y]);
		}
	}
};

