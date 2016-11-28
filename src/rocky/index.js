//================================
//Require:

var rocky = require("rocky");

var screenColor = "white";
var barColor = "red";
var loadColor = "black";
var tickColor = "darkgrey";
var textColor = "black";

var loadOffSet = 3;

//================================
//Functions:

function drawBars(ctx, ws,
				   hs, w,
				   h, minute,
				   hour, date, days) {
	var x = w / 4;
	var y = hs - (7 * h);
	
	for (var ii = 0; ii <= 5; ii++) {
		if (ii % 2 === 0) {
			drawBar(ctx, x, y, barColor, w, h);
			switch (ii / 2) {
				case 0:
					drawBar(ctx, x + loadOffSet,
							y + loadOffSet, loadColor,
							date, h - (2 * loadOffSet));
					drawTicks(ctx, w, h, x, y + h, days / 7);
					break;
				case 1:
					drawBar(ctx, x + loadOffSet,
							y + loadOffSet, loadColor,
							hour, h - (2 * loadOffSet));
					drawTicks(ctx, w, h, x, y + h, 8);
					break;
				case 2:
					drawBar(ctx, x + loadOffSet,
							y + loadOffSet, loadColor,
							minute, h - (2 * loadOffSet));
					drawTicks(ctx, w, h, x, y + h, 12);
					break;
			}
		} else {
			drawBar(ctx, x, y, screenColor, w, h);
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
	ctx.lineWidth = loadOffSet;
	ctx.strokeStyle = tickColor;
	var tickAdvance = (w - (2 * loadOffSet)) / count;
	
	x += loadOffSet;
	for (var ii = 0; ii <= count; ii++) {
		if (ii % 2 === 0) {
			drawLine(ctx, x, y, x, y - (h / 3));
		} else {
			drawLine(ctx, x, y, x, y - ((h / 3) / 2));
		}
		x += tickAdvance;
	}
}

function drawLabel(ctx, ws, x, y, index) {
	ctx.fillStyle = textColor;
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

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function findMonthDays(ctx, d) {
	switch(d.getMonth()) {
		case 0 || 2 || 4 || 6 || 7 || 9 || 11:
			return 31;
		case 3 || 5 || 8 || 10:
			return 30;
		case 1:
			if ((d.getFullYear() % 4) === 0) {
				return 28;
			} else {
				return 29;
			}
			break;
		default:
			return 30;
	}
}

function findTextCenter(ctx, ws, s) {
	return (ws / 2) - (ctx.measureText(s).width / 2);
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
	var loadWidth = (barWidth - (2 * loadOffSet));
	
	var days = findMonthDays(ctx, d);
	var minuteLength = (d.getMinutes() / 60) * loadWidth;
	var hourLength = (d.getHours() / 24) * loadWidth;
	var dayLength = (d.getDate() / days) * loadWidth;
	
	ctx.clearRect(0, 0,
				  ctx.canvas.clientWidth, ctx.canvas.clientHeight);
	ctx.fillStyle = screenColor;
	ctx.fillRect(0, 0, w, h);
	
	drawBars(ctx, w,
			 h, barWidth,
			 barHeight, minuteLength,
			 hourLength, dayLength, days);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});
