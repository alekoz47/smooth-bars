//================================
//Require:

var rocky = require("rocky");

//================================
//Functions:

function drawBars(ctx, hs, w, h) {
	var x = w / 4;
	var y = hs - (7 * h);
	for (var ii = 0; ii < 5; ii++) {
		if (ii % 2 === 0) {
			drawBar(ctx, x, y, "red", w, h);
		} else {
			drawBar(ctx, x, y, "white", w, h);
		}
		y += h;
	}
}

function drawBar(ctx, x, y, color, wb, hb) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, wb, hb);
}

//================================
//Run:

rocky.on("draw", function(event) {
	var ctx = event.context;
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var barWidth = (w / 2) + 30;
	var barHeight = (h / 9);
	var minuteLength = (d.getMinutes() / 60) * barWidth;
	var hourLength = (d.getHours() / 24) * barWidth;
	var dayLength = (d.getDate() / 30) * barWidth;
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	
	drawBars(ctx, h, barWidth, barHeight);
	drawBar(ctx, barWidth / 4, h - (7 * barHeight) + 3, "black", minuteLength, 14);
	drawBar(ctx, barWidth / 4, h - (5 * barHeight) + 3, "black", hourLength, 14);
	drawBar(ctx, barWidth / 4, h - (3 * barHeight) + 3, "black", dayLength, 14);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
