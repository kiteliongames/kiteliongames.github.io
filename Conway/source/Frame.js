//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Conway's Game of Life
// This represents a single frame within the canvas. Knows if it should be alive or dead
// and handles what it's next state should be.

function Frame(isStartingAlive) {
    this.nextState = false;
    this.alive = isStartingAlive;
}

/**
	Applying Conway's Game of Life Rules 1 - 4
*/
Frame.prototype.setNextState = function(){
    this.alive = this.nextState;
}

/**
	Conway's Game of Life Rules 1 - 4 
*/
Frame.prototype.getNextState = function(aliveNeighborsCount) {
	
	var ThisFrame = this; //functions are objects and overwrite this
						  // so we put it in a variable to use here.
	ConwaysGameOfLife = function(count){
		if(count < 2){
			ThisFrame.nextState = false;
		}
		else if(count == 3){
			ThisFrame.nextState = true;
		}
		else if(count > 3 ){
			ThisFrame.nextState = false;
		} 
		else if(count == 2){
			ThisFrame.nextState = ThisFrame.alive;
		}
	}
	ConwaysGameOfLife(aliveNeighborsCount);
    

    return ThisFrame.nextState;
};


