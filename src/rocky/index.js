//================================
//Require:

var rocky = require("rocky");

//================================
//Functions:

function drawBars(ctx, ws, hs, w, h, minute, hour, day) {
	var x = w / 4;
	var y = hs - (7 * h);
	
	for (var ii = 0; ii <= 5; ii++) {
		if (ii % 2 === 0) {
			drawBar(ctx, x, y, "red", w, h);
			switch (ii / 2) {
				case 0:
					drawBar(ctx, x + 3, y + 3, "black", day, h - 6);
					drawTicks(ctx, w, h, x, y + h, 30);
					break;
				case 1:
					drawBar(ctx, x + 3, y + 3, "black", hour, h - 6);
					drawTicks(ctx, w, h, x, y + h, 24);
					break;
				case 2:
					drawBar(ctx, x + 3, y + 3, "black", minute, h - 6);
					drawTicks(ctx, w, h, x, y + h, 60);
					break;
			}
		} else {
			drawBar(ctx, x, y, "white", w, h);
			drawLabel(ctx, ws, x, y, ii - 1);
		}
		y += h;
	}
}

function drawBar(ctx, x, y, color, wb, hb) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, wb, hb);
}

function drawTicks(ctx, w, h, x, y, count) {
	ctx.lineWidth = 3;
	ctx.strokeStyle = "darkgrey";
	var tickAdvance = w / count;
	
	for (var ii = x + 3; ii <= (count * tickAdvance); ii += tickAdvance) {
		drawLine(ctx, ii, y, ii, y - (h / 3));
	}
}

function drawLabel(ctx, ws, x, y, index) {
	ctx.fillStyle = "black";
	//ctx.font = "21px Roboto";
	ctx.font = "18px Gothic";
	ctx.textAlign = "left";
	y -= ctx.measureText("A").height / 4;
	var xd = findTextCenter(ctx, ws, "Days");
	var xh = findTextCenter(ctx, ws, "Hours");
	var xm = findTextCenter(ctx, ws, "Minutes");
	
	switch (index / 2) {
		case 0:
			ctx.fillText("Days", xd, y);
			break;
		case 1:
			ctx.fillText("Hours", xh, y);
			break;
		case 2:
			ctx.fillText("Minutes", xm, y);
			break;
	}
}

function findTextCenter(ctx, ws, s) {
	return (ws / 2) - (ctx.measureText(s).width / 2);
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
	
	drawBars(ctx, w, h, barWidth, barHeight, minuteLength, hourLength, dayLength);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
