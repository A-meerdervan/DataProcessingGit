



// Get the data from the textarea and put it in data
data = []

textArea = document.getElementById("rawData").innerHTML

// THIS DID NOT WORK, because I am not a server
// Get the data from a Json file
// d3.json("d3line.json", function(d) {
//   rawData = d
// })
rawData = JSON.parse(textArea)

for (var i = 0; i < rawData.length; i++) {
  line = rawData[i]
  date = new Date(line[0], line[1], line[2])
  // This is still a string it should be an int
  maxTemp = parseInt(line[3])
  data.push([date, maxTemp, i])
};

// d3.select("body").style("font-size","34px")

totalWidth = window.innerWidth * 0.5
totalHeight = totalWidth * 0.5
margin = {top: 0.2 * totalHeight, right: 0.18 * totalWidth, bottom: 0.2 * totalHeight, left: 0.13 * totalWidth}
width =  totalWidth - margin.left - margin.right
height = totalHeight - margin.top - margin.bottom
fontSize1 = 15
fontSize2 = 14
delay = 800

// Create the chart svg variable

chart = d3.select(".lineChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#ddd")
    .style("padding", 0)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Create the transformation functions
xTrans = d3.scale.linear()
  .range([0, width])
  .domain([0, 365]),

// TODO! nog de range goed doen met margins denk ik
yTrans = d3.scale.linear()
  .range([ height, 0])
  .domain([d3.min(data, function(d) { return d[1] }), d3.max(data, function(d) { return d[1] })])

// Create the d3 axisés

xAxis = d3.svg.axis().scale(xTrans)
  
yAxis = d3.svg.axis().scale(yTrans).orient("left")

// append  X axis

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    // Add label
  .append("text")
    .attr("transform", "translate(" + (0.7*width) + "," + (0.7*margin.bottom) + ")")
    .style("text-anchor", "right")
    .style("font-size", fontSize1)
    .text("the day of the year")

// append  Y axis

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    // Add label
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", - 0.6 * margin.left)
    .style("text-anchor", "end")
    .style("font-size", fontSize1)
    .text("Temperature in degrees")

// Create the Title
chart.append("text")
    .attr("transform", "translate(" + (0.1*width) + "," + (- 0.3*margin.top) + ")")
    // .style("text-anchor", "end")
    .style("font-size", fontSize1 * 1.5)
    .text("Maximum temperature per day in \"De Bilt(NL) during 1994")

// Create a function that will be able to draw the data line
var lineGen = d3.svg.line()
  .x(function(d) {
      return xTrans(d[2])
  })
  .y(function(d) {
      return yTrans(d[1])
  })
  // .interpolate("basis")

// Create the path element that will be the data line and apply styles
chart.append('path')
  .attr("class", "line")
  .attr('d', lineGen(data))
  .attr('stroke', 'red')
  .attr('fill', 'none')


// Inpiration for the crosshairs was taken from http://tributary.io/inlet/8677777

// Set the font size of everything
// d3.select("body").style("font-size", 30)

// Create temperature tooltip text
var toolTipTemp = chart.append("g")
  .attr("class","tooltip tooltipText")
  .style("display", "none")

// toolTipTemp.append("text")


var toolTipDate = chart.append("g")
  .attr("class", "tooltip tooltipText")
  .style("display", "none")

// toolTipDate.append("text")

d3.selectAll(".tooltipText")
  .append("rect")
  .attr("class", "tooltip")
  .attr("position", "absolute")
  .attr("y", -0.05*height)
  .style("width", 0.2* width)
  .style("height", 0.08* height)
  .style("padding", 8)
  .style("fill", "#ffffff")

tooltipsText = d3.selectAll(".tooltipText")
tooltipsText
  .append("text")
  .attr("class", "tooltip tooltipText")
  .style("font-size", fontSize2)

// add cross hairs and floating value on axis
crossHairs = chart.append("g")
  .attr("class","tooltip")
  .style("display", "none")

   
    // horizontal crosshair 
    crossHairs.append("line")
          .attr({
            "x1": -width,
            "y1": 0,
            "x2": width,
            "y2": 0,
            "stroke-width": 1,
            "stroke": "black"
          })
          .attr("class", "tooltip")


    // vertical crosshair
    
    crossHairs.append("line")
            .attr({
              "x1": 0,
              "y1": -height,
              "x2": 0,
              "y2": height,
              "stroke-width": 1,
              "stroke": "black"
            })
            .attr("class", "tooltip")
    
    
    chart.append("rect")
        .attr({"class": "overlay" , "width": width , "height": height})
        .style("fill", "none")
        .style("pointer-events", "all")
        .on({
          "mouseover": mouseover,  
          "mouseout": mouseout,   
          "mousemove": mousemove
        })
  
tooltipGroup = d3.selectAll(".tooltip")

function mouseover() {
  tooltipGroup.style("display", "none")
  // clearTimeout(timeOut)


}

function mouseout() {
  tooltipGroup.style("display", "none")
  clearTimeout(timeOut)
}

// This map is used to map the 0 to 11 values from the getMonth() 
// function to actual month strings
monthMap = ["Januarie", "Februari", "March", "April", "Mai", "June", "Juli", "August", "September", "Oktober", "November", "December"]

function mousemove() {
  // Hide the tooltip text boxes but not the lines
  tooltipGroup.style("display", "block")
  tooltipsText.style("display", "none")
  // Save the mouse position
  mouseX = d3.event.pageX
  mouseY = d3.event.pageY
  // Update the crosshairs
  day = Math.round(xTrans.invert(mouseX - margin.left))
  xTranslation = (mouseX - margin.left)
  yTranslation = yTrans(data[day][1])
  crossHairs.attr("transform", "translate(" + xTranslation + "," + yTranslation + ")")
  
  // Set the time out for the tooltip
  timeOut = setTimeout(function() {
    // day = Math.round(xTrans.invert(mouseX - margin.left))
    // xTranslation = (mouseX - margin.left)
    // yTranslation = yTrans(data[day][1])
    crossHairs.attr("transform", "translate(" + xTranslation + "," + yTranslation + ")")
    // crossHairs.attr("transform", "translate(" + (d3.event.pageX - margin.left) + "," + yTrans(data[day][1]) + ")")
    // update temperature tooltip
    toolTipTemp.attr("transform", "translate(" + (xTranslation + 0.05*width) + "," + (yTranslation + 0.05*height) + ")")
    toolTipTemp.select("text").text(data[day][1] + " Degrees C.")
    // update date tooltip
    date = data[day][0]
    dateString =  date.getDate() + " "  + monthMap[date.getMonth()]
    toolTipDate.attr("transform", "translate(" + (xTranslation + 0.01*width) + "," + (yTranslation - 0.08*height) + ")")
    toolTipDate.select("text").text(dateString)
    
    tooltipsText.style("display", "block")
    clearTimeout(timeOut)
  // The delay is speciefied at the top of the file  
  }, delay)

}




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








