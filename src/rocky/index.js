//================================
//Require:

var rocky = require("rocky");
var barWidth = 100;
var barHeight = 20;

//================================
//Functions:

function drawBars(ctx, w, h) {
	var y = 20;
	for (var ii = 0; ii <= 6; ii++) {
		if (ii % 2 === 0) {
			drawBar();
			y += barHeight;
		} else {
			drawBar();
			y += barHeight;
		}
	}
}

function drawBar(ctx, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(20, y, barWidth, barHeight);
}

function drawSlides() {
	return null;
}

//================================
//Run:

rocky.on("draw", function(event) {
	var ctx = event.context;
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var minutes = (d.getMinutes()) / 60;
	var hours = (d.getHours() % 12 + (minutes / 60)) / 12;
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	
	drawBars(ctx, w, h);
	drawSlides(ctx, minutes, hours);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
