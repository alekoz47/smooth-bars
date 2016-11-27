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

function drawLoads(ctx, ws, hs, wb, hb, days, minutes, hours) {
	return null;
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
	var minutes = (d.getMinutes()) / 60;
	var hours = (d.getHours() % 12 + (minutes / 60)) / 12;
	var days = d.getDate();
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	
	drawBars(ctx, h, barWidth, barHeight);
	drawLoads(ctx, h, barWidth, barHeight - 5, days, hours, minutes);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
