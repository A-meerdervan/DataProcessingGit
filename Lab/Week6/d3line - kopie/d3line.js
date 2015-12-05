



// Get the data from the textarea and put it in data
data = []

textArea = document.getElementById("rawData").innerHTML

rawData = JSON.parse(textArea)

for (var i = 0; i < rawData.length; i++) {
  line = rawData[i]
  date = new Date(line[0], line[1], line[2])
  // This is still a string it should be an int
  maxTemp = parseInt(line[3])
  data.push([date, maxTemp, i])
};

totalWidth = window.innerWidth * 0.6
totalHeight = totalWidth * 0.5
margin = {top: 0.1 * totalHeight, right: 0.15 * totalWidth, bottom: 0.1 * totalHeight, left: 0.13 * totalWidth}
width =  totalWidth - margin.left - margin.right
height = totalHeight - margin.top - margin.bottom

// Create the chart svg variable

chart = d3.select(".lineChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // Attach event listeners for the tooltip
    .on("mouseover", onMouseover)
    .on("mousemove", onMousemove)
    .on("mouseout", onMouseout)
    .style("background", "#ddd")
    .style("padding", 0)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


////////////////

// Create temperature tooltip text
var toolTipTemp = chart.append("g")
  .attr("class","tooltip")
  .style("display", "none")

var toolTipDate = chart.append("g")
  .attr("class", "tooltip")
  .style("display", "none")

toolTipTemp.append("text").attr({"x": 9, "dy": "0.35em"});
// add cross hairs and floating value on axis
var crossHairs = chart.append("g")
  .attr("class","tooltip")
  .style("display", "none");

   
    // horizontal crosshair 
    crossHairs.append("line")
          .attr({
            "x1": -width,
            "y1": 0,
            "x2": width,
            "y2": 0,
            "stroke-width": 1,
            "stroke": "black"
          });


    // vertical crosshair
    
    crossHairs.append("line")
            .attr({
              "x1": 0,
              "y1": -height,
              "x2": 0,
              "y2": height,
              "stroke-width": 1,
              "stroke": "black"
            });
    
    
    chart.append("rect")
        .attr({"class": "overlay" , "width": width , "height": height})
        .style("fill", "none")
        .style("pointer-events", "all")
        .on({
          "mouseover": function() { crossHairs.style("display", null);  toolTipTemp.style("display", null); },
          "mouseout":  function() { crossHairs.style("display", "none");  toolTipTemp.style("display", "none"); }, 
          "mousemove": mousemove
        });
  
monthMap = ["Januarie", "Februari", "March", "April", "Mai", "June", "Juli", "August", "September", "Oktober", "November", "December"]

function mousemove() {

  crossHairs.style("display", "block")

  console.log(d3.event.pageX)
  console.log(xTrans.invert(d3.event.pageX - margin.left))
  console.log(data[xTrans(d3.event.pageX)])
  day = Math.round(xTrans.invert(d3.event.pageX - margin.left))
  xTranslation = (d3.event.pageX - margin.left)
  yTranslation = yTrans(data[day][1])
  crossHairs.attr("transform", "translate(" + xTranslation + "," + yTranslation + ")")
  // crossHairs.attr("transform", "translate(" + (d3.event.pageX - margin.left) + "," + yTrans(data[day][1]) + ")");
  console.log(margin.left)

  toolTipTemp.attr("transform", "translate(" + (xTranslation + 0.05*width) + "," + (yTranslation + 0.05*height) + ")");
  toolTipTemp.select("text").text(data[day][1] + " Degrees C.");
  date = data[day][0]
  dateString =  date.getDate() + " "  + monthMap[date.getMonth()]
  console.log(dateString)
}


/////////////////// 

// Create the tooltip div
div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("display", "none")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("width", 60)
    .style("height", 12)
    .style("padding", 8)
    .style("background", "#ddd")
    // this prevents flickering behaviour
    .style("pointer-events", "none")

// Create the transformation functions
xTrans = d3.scale.linear()
  .range([0, width])
  .domain([0, 365]),

// TODO! nog de range goed doen met margins denk ik
yTrans = d3.scale.linear()
  .range([ height, 0])
  .domain([d3.min(data, function(d) { return d[1]; }), d3.max(data, function(d) { return d[1]; })]);

// Create the d3 axisés

xAxis = d3.svg.axis().scale(xTrans)
  
yAxis = d3.svg.axis().scale(yTrans).orient("left")

// append  X axis

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// append  Y axis

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", - 0.8 * margin.left)
    .style("text-anchor", "end")
    .text("Temperature in degrees");

// Create a function that will be able to draw the data line
var lineGen = d3.svg.line()
  .x(function(d) {
      return xTrans(d[2]);
  })
  .y(function(d) {
      return yTrans(d[1]);
  })
  // .interpolate("basis");

// Create the path element that will be the data line and apply styles
chart.append('path')
  .attr("class", "line")
  .attr('d', lineGen(data))
  .attr('stroke', 'red')
  .attr('fill', 'none');

// Deal with the crosshair - mouse interaction:

function onMouseover() {
  div.style("display", "inline");
}

function onMousemove() {
  div
      .text(d3.event.pageX + ", " + d3.event.pageY)
      .style("left", (d3.event.pageX + 30)+ "px")
      .style("top", (d3.event.pageY + 30) + "px");
      // draw a line

      // Vertical crosshair
      drawLine(chart, d3.event.pageX, d3.event.pageX, yTrans(d3.max(data, function(d) { return d[1]; })), yTrans(d3.min(data, function(d) { return d[1]; })))
      // verticalNote.innerHTML = "<p>".concat(dataPoints[day][0].toDateString()).concat(" </p> ")
      // verticalNote.style.top = (Y_transf(dataPoints[day][1]) + height * 0.1).toString().concat("px")
      // verticalNote.style.left = (x + (0.01 * width)).toString().concat("px")


      // // Horizontal crosshair
      // drawLine(X_transf(Xmin),  Y_transf(dataPoints[day][1]), X_transf(Xmax),  Y_transf(dataPoints[day][1]), "", 2, ctxOverlay);
      // horizontalNote.innerHTML = "<p>".concat(dataPoints[day][1].toString()).concat(" Celsius").concat(" </p> ")
      // horizontalNote.style.top = (Y_transf(dataPoints[day][1]) - (height * 0.05)).toString().concat("px")
      // horizontalNote.style.left = (x - (0.1 * width)).toString().concat("px")      

}
console.log(totalHeight)

function onMouseout() {
  div.style("display", "none");
}

// function createTransform(domain, pixelRange){
//   var startDomain = domain[0]
//   var endDomain = domain[1]
//   var beta = pixelRange[0];
//   var alpha = (pixelRange[1] - pixelRange[0]) / (domain[1] - domain[0]);

//   return function(x){
//     if (x < startDomain || x > endDomain){
//       console.log(" (inside createTransform:) The value was outside the domain bounds")
//     }
//     else{ return (x - startDomain) * alpha + beta;}
//   };
// }

function drawLine(target, x1, x2, y1, y2) {

  
  target.append("line")
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("x1", 150)
  .attr("y1", 0)
  .attr("x2", 150)
  .attr("y2", height)
  .attr("stroke-width", 2)
  .attr("stroke", "black");
}








