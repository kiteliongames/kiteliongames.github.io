//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Conway's Game of Life
// This file launches the game and gatheres parameters for D3. Also handles html button code.



var w = window.innerWidth/2,
    h = window.innerHeight/2
//to get a fitting square we get the smaller of the two:
if(h > w){h = w;}else{w = h;}

var columns = 30,
    rows = 30,
    wRatio = w/columns,
    hRatio = h/rows;
	//To fit on any size screen we get a ratio for each square.


var MyCanvas = new Canvas(rows,columns);
MyCanvas.start();

var svg = d3.select("body").append("svg:svg")
	.attr("width", w)
	.attr("height", h);

var frames = svg.selectAll("foo"); //build empty selection to interact with.

var autorun = false,
	ticks = 0,
	speed = 1000 // 1000 ms = 1 s
	frameGapModifier = 0.9; //space between each rect.


function PlayLoop(){

	ticks++;

    //fill the rect html tag with data on living frames.
    frames = frames.data(MyCanvas.allLivingFrames(),
        function(d){return d.frameNumber});
    //We also hand over the frame's number. This is because D3 handles this like
    // an ID and it needs to know which ones were just added (enter()) and
    // which ones have not been re-added, to which the exit() will be applied.

    //we apply location and animation data to the
    // new data. and Append/Add a rect for each.
	frames.enter().append("rect")
			.attr("x", function(d){return d.x*wRatio})
			.attr("y", function(d){return d.y*hRatio})
			.transition().duration(500)
				.attr("width", wRatio * frameGapModifier)
				.attr("height", hRatio * frameGapModifier)
				.style("fill","white");;

    //For all the frames not re-added into the selection, apply exit()
	frames.exit()
		.style("fill","grey");

	if(autorun){
        //re-call PlayLoop with minimum 2 second autorun speed.
		setTimeout(PlayLoop,2000+speed);
	}
    //jquery the tick count into the html tag
	$("label#Ticks").html(ticks);
    //and get the speed from the form html input
	speed = $("input#Speed").val() * 1000;

    //Here all the Conway math occurs for the next round / tick.
    MyCanvas.next();
}
PlayLoop();


function ToggleAutorun(){
	autorun = !autorun;
	if(autorun){
		PlayLoop(autorun);
	}
	console.log("Toggling Autorun: " + autorun);
}

function Step(){
	autorun = false;
	PlayLoop(autorun);
}
