

// Get the data from the textarea and put it in dataPoints
dataPoints = []

textArea = document.getElementById("rawData").innerHTML

rawData = JSON.parse(textArea)

for (var i = 0; i < rawData.length; i++) {
	line = rawData[i]
	date = new Date(line[0], line[1], line[2])
	// This is still a string it should be an int
	maxTemp = line[3]
	dataPoints.push([date, maxTemp])
};

// This function draws the graph and is called at the start of the body tag in the html
function draw(){
	// width = window.innerWidth * 0.8;
 //    height = window.innerHeight * 0.8;

	lineGraph = document.getElementById("lineGraph");
	width = lineGraph.width
	height = lineGraph.height

	// this is a check to see if the browser supports canvas elements
	if (lineGraph.getContext){
		// this value is global for use in the drawline function
		this.ctx = lineGraph.getContext("2d")

		// Draw graph contour
		ctx.strokeRect(0,0, width, height)

		// Create transform pair with 10 to pixels to spare on the left and right side
		Ymin = -10
		Ymax = 30
		Xmin = 0
		Xmax = 365
		axisMargin = 50
		// Create transform pair with 10 to pixels to spare on the left and right side
		Y_transf = createTransform([Ymin, Ymax], [height - axisMargin, 2* axisMargin])
		X_transf = createTransform([Xmin, Xmax], [axisMargin , width - axisMargin])
		rangeY = Y_transf(Ymin) - Y_transf(Ymax)
		
		// A function to draw a line
		// function drawLine(startX, startY, endX, endY, strokeStyle, lineWidth) {
		// 	ctx.save()
		//     if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
		//     if (lineWidth != null) ctx.lineWidth = lineWidth;
		//     ctx.beginPath();
		//     ctx.moveTo(startX, startY);
		//     ctx.lineTo(endX, endY);
		//     ctx.stroke();
		//     ctx.closePath();    
		//     ctx.restore()
		// }

		// Draw X axis
		drawLine(X_transf(Xmin), Y_transf(Ymin), X_transf(Xmax), Y_transf(Ymin), "", 2, ctx)
		// Draw Y axis
		drawLine(X_transf(Xmin), Y_transf(Ymin), X_transf(Xmin), Y_transf(Ymax), "", 2, ctx)
		// Draw title
		titleOffset = 1.3 * axisMargin
		ctx.save()
		ctx.font = "19pt Calibri"
		ctx.fillStyle = "#ff000" // red
		ctx.textAlign = "center"
		ctx.fillText("Maximum temperature per day in \"De Bilt(NL)\" during 1994", width/2, titleOffset)
		ctx.restore()

		// Next the Y axis wil be labeled
		txtArray = ["-10", "0", "10", "20"]
		lineWidthBig = 10
		lineWidthSmall = 5
		distanceToAxis = 4
		distanceToLine = 4

		// Draw the lines indicating the values and the values themselfs
		for (i = 0; i < txtArray.length; i++){
			// draw larger lines
			distanceBetweenLabels = ( rangeY / txtArray.length)
			Yposistion = Y_transf(Ymin) - i * distanceBetweenLabels	
			console.log(Yposistion)
			drawLine(X_transf(Xmin) - lineWidthBig, Yposistion , X_transf(Xmin), Yposistion, "", 1, ctx)
			// draw smaller lines
			drawLine(X_transf(Xmin) - lineWidthSmall, Yposistion - 0.5*distanceBetweenLabels , X_transf(Xmin), Yposistion -0.5*distanceBetweenLabels, "", 1, ctx)

			// draw text value
			ctx.font = "11pt Calibri"
        	txtSize = ctx.measureText(txtArray[i]);
        	ctx.fillText(txtArray[i], axisMargin - txtSize.width - distanceToAxis, Yposistion - distanceToLine );
		}
		// Draw Y axis label
		// start by saving the current context (current orientation, origin)
		ctx.save()
		ctx.translate(0, height)
		ctx.rotate( - Math.PI / 2)
		ctx.font = "13pt Calibri"
		ctx.fillStyle = "#ff000" // red
		ctx.textAlign = "center"
		ctx.fillText("Temperature in degrees Celsius", height / 2, axisMargin * 0.4)
		ctx.restore()

		// next the X axis wil be labeled
		txtArray = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
		colorsArray = ["rgba(10, 248, 241, 0.3)", "rgba(255, 236, 2, 0.3)"]					
		lineWidth = 5
		distanceToAxi = 15
		distanceToLine = 4

		// draw the lines indicating the values and the values themselfs
		for (i = 0; i < txtArray.length; i++){
			// draw Square to outline a month
			widthMonth = (width - 2* axisMargin) / 12
			//heightRect = Y_transf(Ymin) - Y_transf(Ymax)
			//ctx.save()
			//ctx.fillStyle = colorsArray[i%2]//"rgba(0," + i*20 + " , 200, 0.5)";
        	//ctx.fillRect (X_transf(Xmin) + i * widthMonth , Y_transf(Ymax), widthMonth, heightRect);
        	//ctx.restore()

			// draw text value
			ctx.font = "11pt Calibri"
			ctx.textAlign = "center"
        	txtSize = ctx.measureText(txtArray[i]);
        	ctx.fillText(txtArray[i], axisMargin + i * widthMonth + (widthMonth/2), Y_transf(Ymin) + distanceToAxi );
		}

		 // Draw 0 Temperature line
		drawLine(X_transf(Xmin), Y_transf(0), X_transf(Xmax), Y_transf(0), "", 1, ctx)

	    // Draw data
	    ctx.save()
	    ctx.strokeStyle = "rgb(200,0,0)"
	    ctx.lineWidth = 1
	    ctx.beginPath()
	    ctx.moveTo(X_transf(0) , Y_transf(dataPoints[0][1]))
	    for (var i = 1; i < dataPoints.length; i++) {
	    	ctx.lineTo( X_transf(i), Y_transf( dataPoints[i][1]))
	    };
	    ctx.stroke();
	    ctx.restore()
	};
	lineGraphOverlay = document.getElementById("mouseOverlay");
	// this is a check to see if the browser supports canvas elements
	if (lineGraphOverlay.getContext){
		// this value is global for use in the drawline function
		ctxOverlay = lineGraphOverlay.getContext("2d")
	}
}

function drawLine(startX, startY, endX, endY, strokeStyle, lineWidth, context) {
	context.save()
    if (strokeStyle != null) context.strokeStyle = strokeStyle;
    if (lineWidth != null) context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();    
    context.restore()
}

// This function transforms one range to another
// Range stands for the pixels
// Domain stands for the values to be represented on the axis
function createTransform(domain, pixelRange){
	var startDomain = domain[0]
	var endDomain = domain[1]
	var beta = pixelRange[0];
	var alpha = (pixelRange[1] - pixelRange[0]) / (domain[1] - domain[0]);

	return function(x){
		if (x < startDomain || x > endDomain){
			console.log(" (inside createTransform:) The value was outside the domain bounds")
		}
		else{ return (x - startDomain) * alpha + beta;}
	};
}

// Track the Mouse

verticalNote = document.getElementById("verticalNote")
horizontalNote = document.getElementById("horizontalNote")

function showCoords(event) {
	
	X_transfINV = createTransform([axisMargin , width - axisMargin], [Xmin, Xmax])

	// Clear crosshair
    ctxOverlay.clearRect(0, 0, width, height)
    console.log(verticalNote.visibility)
    verticalNote.display = "none"


    var x = event.clientX;
    var y = event.clientY;
    mouseOnGraph = (x > X_transf(Xmin) && x < X_transf(Xmax)) && (y > Y_transf(Ymax) && y < Y_transf(Ymin))
    if( mouseOnGraph) {
    	verticalNote.style.display = "block"
    	horizontalNote.style.display = "block"
    	day = Math.round(X_transfINV(x))

    	// Vertical crosshair
  		drawLine(x, Y_transf(Ymax), x, Y_transf(Ymin), "", 2, ctxOverlay);
  		verticalNote.innerHTML = "<p>".concat(dataPoints[day][0].toDateString()).concat(" </p> ")
  		verticalNote.style.top = (Y_transf(dataPoints[day][1]) + height * 0.1).toString().concat("px")
  		verticalNote.style.left = (x + (0.01 * width)).toString().concat("px")
  		console.log(verticalNote.style.top)


  		// Horizontal crosshair
    	drawLine(X_transf(Xmin),  Y_transf(dataPoints[day][1]), X_transf(Xmax),  Y_transf(dataPoints[day][1]), "", 2, ctxOverlay);
    	horizontalNote.innerHTML = "<p>".concat(dataPoints[day][1].toString()).concat(" Celsius").concat(" </p> ")
  		horizontalNote.style.top = (Y_transf(dataPoints[day][1]) - (height * 0.05)).toString().concat("px")
  		horizontalNote.style.left = (x - (0.1 * width)).toString().concat("px")


    }
    else{
    	verticalNote.style.display = "none"
    	horizontalNote.style.display = "none"
    }
}



