


function draw(){
	
	var lineGraph = document.getElementById("lineGraph");
	var width = 800
	var height = 600
	lineGraph.width = width
	lineGraph.height = height

	if (lineGraph.getContext){
		var ctx = lineGraph.getContext("2d")

		// Draw graph contour
		ctx.strokeRect(0,0, width, height)

		// Create transform pair with 10 to pixels to spare on the left and right side
		Ymin = -10
		Ymax = 30
		Xmin = 0
		Xmax = 365
		axisMargin = 50
		// Create transform pair with 10 to pixels to spare on the left and right side
		var Y_transf = createTransform([Ymin, Ymax], [height - axisMargin, 2* axisMargin])
		var X_transf = createTransform([Xmin, Xmax], [axisMargin , width - axisMargin])
		rangeY = Y_transf(Ymin) - Y_transf(Ymax)
		// A function to draw a line
		function drawLine(startX, startY, endX, endY, strokeStyle, lineWidth) {
			ctx.save()
		    if (strokeStyle != null) ctx.strokeStyle = strokeStyle;
		    if (lineWidth != null) ctx.lineWidth = lineWidth;
		    ctx.beginPath();
		    ctx.moveTo(startX, startY);
		    ctx.lineTo(endX, endY);
		    ctx.stroke();
		    ctx.closePath();    
		    ctx.restore()
		}

		// Draw X axis
		drawLine(X_transf(Xmin), Y_transf(Ymin), X_transf(Xmax), Y_transf(Ymin), "", 2)
		// Draw Y axis
		drawLine(X_transf(Xmin), Y_transf(Ymin), X_transf(Xmin), Y_transf(Ymax), "", 2)
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
			drawLine(X_transf(Xmin) - lineWidthBig, Yposistion , X_transf(Xmin), Yposistion, "", 1)
			// draw smaller lines
			drawLine(X_transf(Xmin) - lineWidthSmall, Yposistion - 0.5*distanceBetweenLabels , X_transf(Xmin), Yposistion -0.5*distanceBetweenLabels, "", 1)

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
			widthRect = (width - 2* axisMargin) / 12
			heightRect = Y_transf(Ymin) - Y_transf(Ymax)
			ctx.save()
			ctx.fillStyle = colorsArray[i%2]//"rgba(0," + i*20 + " , 200, 0.5)";
        	ctx.fillRect (X_transf(Xmin) + i * widthRect , Y_transf(Ymax), widthRect, heightRect);
        	ctx.restore()

			// draw text value
			ctx.font = "11pt Calibri"
			ctx.textAlign = "center"
        	txtSize = ctx.measureText(txtArray[i]);
        	ctx.fillText(txtArray[i], axisMargin + i * widthRect + (widthRect/2), Y_transf(Ymin) + distanceToAxi );
		}

		 // Draw 0 Temperature line
		drawLine(X_transf(Xmin), Y_transf(0), X_transf(Xmax), Y_transf(0), "", 1)

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
	}

	// TESTING:
	var canvas = document.getElementById('myCanvas');
	var width = 800
	var height = 400
	canvas.width = width
	canvas.height = height
	if (canvas.getContext){
	  	var ctx = canvas.getContext('2d');
	 	ctx.fillStyle = "rgb(200,0,0)";  
	 	// first is padding left second is padding top, then width and heigth
		ctx.fillRect(5, 20, 10, 100);
		ctx.strokeRect(0, 0, width, height)
		// Make a triangle
	    ctx.beginPath();
	    ctx.moveTo(75 + 200,50);
	    ctx.lineTo(100 + 600,75);
	    ctx.lineTo(100 + 600,25);
	    ctx.fill();

		// rgba is for transparent stuff
		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
        ctx.fillRect (0, 30, 55, 50);

        // Draw a Smiley
        ctx.beginPath();
	    ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
	    ctx.moveTo(110,75);
	    ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
	    ctx.moveTo(65,65);
	    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
	    ctx.moveTo(95,65);
	    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
	   	ctx.fill();
	}
	else{
		// TODO Dit klopt niet maar hoe doe ik het wel goed?
		canvas.firstChild.HTMLcontent = "Your browser is old brah.."
	}
}

// This function transforms one range to another
//range stands for the pixels
//domain stands for the values to be represented on the axis
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




// Get the data from the textarea and put it in dataPoints
dataPoints = []

textArea = document.getElementById("rawData").innerHTML
console.log(textArea.innerHTML)
dataLines = textArea.split("\n")
for ( i = 1; i < dataLines.length -1; i++) {
	line = dataLines[i].split(",")
	date = new Date(line[0], line[1], line[2])
	// This is still a string it should be an int
	maxTemp = line[3]
	dataPoints.push([date, maxTemp])
}


// console.log(textArea.innerHTML)

// Creator = Header.getElementsByTagName("p")[0]
// ApplePie.creator = Creator.innerHTML
// // Get the Ingredients
// IngredientsBundle = document.getElementById("ingredient-list")
// console.log(IngredientsBundle)
// IngredientsList = IngredientsBundle.getElementsByTagName("li")
// for ( i = 0; i < IngredientsList.length; i++) {
// 	ApplePie.ingredients.push(IngredientsList[i].innerHTML)	
// };