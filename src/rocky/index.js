//================================
//Require:

var rocky = require("rocky");

//================================
//Functions:

function drawBars(ctx, hs, w, h, minute, hour, day) {
	var x = w / 4;
	var y = hs - (7 * h);
	
	for (var ii = 0; ii <= 5; ii++) {
		if (ii % 2 === 0) {
			drawBar(ctx, x, y, "red", w, h);
			switch (ii / 2) {
				case 0:
					drawBar(ctx, x + 3, y + 3, "black", day, h - 6);
					break;
				case 1:
					drawBar(ctx, x + 3, y + 3, "black", hour, h - 6);
					break;
				case 2:
					drawBar(ctx, x + 3, y + 3, "black", minute, h - 6);
					break;
			}
			drawTicks(ctx, w, h, x, y + h, ii);
		} else {
			drawBar(ctx, x, y, "white", w, h);
			drawLabel(ctx, x, y, ii);
		}
		y += h;
	}
}

function drawBar(ctx, x, y, color, wb, hb) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, wb, hb);
}

function drawTicks(ctx, w, h, x, y, index) {
	var tickCount = 0;
	ctx.lineWidth = 3;
	ctx.strokeStyle = "darkgrey";
	switch (index) {
		case 0:
			tickCount = 30;
			break;
		case 1:
			tickCount = 24;
			break;
		case 2:
			tickCount = 60;
			break;
	}
	var tickAdvance = w / tickCount;
	
	for (var ii = x + 3; ii <= tickCount * tickAdvance; ii += tickAdvance) {
		drawLine(ctx, ii, y, ii, y - (h / 3));
	}
}

function drawLabel(ctx, x, y, index) {
	return null;
}

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
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
	var minuteLength = (d.getMinutes() / 60) * (barWidth - 6);
	var hourLength = (d.getHours() / 24) * (barWidth - 6);
	var dayLength = (d.getDate() / 30) * (barWidth - 6);
	
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	
	drawBars(ctx, h, barWidth, barHeight, minuteLength, hourLength, dayLength);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
