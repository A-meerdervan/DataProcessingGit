

// Get the json data from the textarea and put it in data
data = []
dataDict = {}

textArea = document.getElementById("rawData").innerHTML
textPopArea = document.getElementById("popData").innerHTML

// THIS DID NOT WORK, because I am not a server
// Get the data from a Json file
// d3.json("d3line.json", function(d) {
//   rawData = d
// })
rawData = JSON.parse(textArea)
rawPopData = JSON.parse(textPopArea)

console.log(rawData.length)
console.log(rawPopData.length)


// Colours were taken from color brewer
// This function returns a color code for a data value
var getColor = function(fertilityRate){
	colorList = ["#b10026", "#e31a1c", "#fc4e2a", "#fd8d3c", "#feb24c", "#fed976", "#ffeda0", "#ffffcc"]
	colorLegend = [1.35, 1.45, 1.55, 1.65, 1.75, 1.85, 1.95]

	for (var i = 0; i < colorLegend.length; i++) {	
		if (fertilityRate < colorLegend[i]){
			return colorList[i]
		}
	}
	// if the fertility rate is more than 1.95 return the last color
	return colorList[colorList.length - 1]
}

// Attach the colors to the data list
for (var i = 0; i < rawData.length; i++) {
  line = rawData[i]
  linePop = rawPopData[i]

  newLine = []
  newLine.push(line[0])
  newLine.push(line[1])
  newLine.push(getColor(line[1]))

  X_Ylist = []
  X_Ydict = {}

  for (var j = 2; j < line.length; j++) {
    if ( line[j] != "") {
        X_Ylist.push([ j + 1958 , line[j] ])
        X_Ydict[j + 1958] = line[j]
    }
    else {
      X_Ydict[j + 1958] = "unknown"
    }
    X_Ydict[2013] = line[1]
    // The x is the year and the y is the fertility rate
  }
  newLine.push(X_Ylist)
  newLine.push(X_Ydict)
  data.push(newLine)
  // the key is the country code and the x y values and the population size in 2013 are added
  dataDict[line[0]] = [X_Ydict, linePop[1] ]
}
console.log(dataDict)

var dataset = {}
// countries don't listed in dataset will be painted with this color
fillSet = {defaultFill: "#999966"}

// Colour the counties after their value in 2013
data.forEach(function(countryData){ //
    // item example value ["USA", 70]
    var countryCode = countryData[0],
    value = countryData[1]
    dataset[countryCode] = { fillKey: countryData[2], fertilityRate: value }
	fillSet[countryData[2]] = countryData[2]
})


map = new Datamap({
    element: document.getElementById('container'),
    scope: "world",

    // Zoom in on Europe
    setProjection: function(element) {
    var projection =  d3.geo["mercator"]()
      .center([20, 54])
      .rotate([4.4, 0])
      .scale(450)
      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    var path = d3.geo.path()
      .projection(projection);
    
    return {path: path, projection: projection};
    },
    fills: fillSet,
    data: dataset,
    // Redirect when clicked to own method to update the graph
    done: function(map) {
      map.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
        updateVisalizationOnClick(geography.id, geography.properties.name)
      })

        
    },
    geographyConfig: {
     // white borders
        borderColor: "#000000",
        highlightBorderWidth: 1,
        // change color on mouse hover
        highlightFillColor: function(geo) {
            return geo['fillColor'] || '#F5F5F5';
        },
        // only change border
        highlightBorderColor: '#B7B7B7',
        // show desired information in tooltip
        popupTemplate: function(geo, data) {
            // Only show tooltip if country is present in the dataset
            if (!data) { return ; }
            // tooltip content:
            return ['<div class="hoverinfo">',
                '<strong>', geo.properties.name, '</strong>',
                '<br>Fertility rate: <strong>', data.fertilityRate, '</strong>',
                '</div>'].join('');
        }
    }
})
// map.legend()
// de defaultCountry displayed is Luxembourg
countryCode = ""


populationText = d3.select("#population")
newPopulationText = d3.select("#newPopulation")

function updateVisalizationOnClick(Countrycode, CountryName){
  countryCode = Countrycode
  // the current population in millions in two decimal places
  currentPopulation = (dataDict[countryCode][1]/1000000).toFixed(1)
  populationText.html(" " + currentPopulation)
  // run the model with 25 year generation length and 200 years time
  newPopulationText.html(" " + calculateNewPopulation(currentPopulation, 25, 200, countryCode))
  // Show the dot
  dataDot.style("display", "none")
  // Colour all lines grey
  chart.selectAll("path")
    .attr('fill', 'none')
    .attr("stroke-width", 1)
    .attr('stroke', 'grey')

  // Colour the country that was selected red
  d3.select(".line" + countryCode)
    .attr('fill', 'none')
    .attr("stroke-width", 6)
    .attr('stroke', 'red')


}

// this holds a simple model I made to calculate the size of a population in the future, assuming the fertility rate remains constant. 
// at a value around 2.1 the population size stays the same. 
function calculateNewPopulation(currentPopulation, generationTime, years, countryCode){
  
  fertilityRate =  dataDict[countryCode][0][2013]
  newPopulation = currentPopulation * Math.pow((fertilityRate/2.1), (years / generationTime))
  return newPopulation.toFixed(1)
}

totalWidth = 500
totalHeight = totalWidth * 1
margin = {top: 0.1 * totalHeight, right: 0.18 * totalWidth, bottom: 0.2 * totalHeight, left: 0.13 * totalWidth}
width =  totalWidth - margin.left - margin.right
height = totalHeight - margin.top - margin.bottom
fontSize1 = 12.5
fontSize2 = 14
delay = 500

chart = d3.select(".lineChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  // add an initial transform to all g elements
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Create the transformation functions
xTrans = d3.scale.linear()
  .range([0, width])
  .domain([1960, 2013]),

yTrans = d3.scale.linear()
  .range([ height, 0])
  // The lowest rate is 1.3 and the highest 4.2
  .domain([1, 4.4])

// Create the d3 axisés

xAxis = d3.svg.axis().scale(xTrans).tickFormat(d3.format("d"))
  
yAxis = d3.svg.axis().scale(yTrans).orient("left")

// append  X axis

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

// append  Y axis

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis)

// Create the Title
chart.append("text")
    .attr("transform", "translate(" + (0.0*width) + "," + (- 0.3*margin.top) + ")")
    // .style("text-anchor", "end")
    .style("font-size", fontSize1 * 1.2)
    .text("Fertility rate in children per woman from 1960 until 2013")

// Draw all lines in the graph bases on the data
for (var i = 0; i < data.length; i++) {
        // Create a function that will be able to draw the data line
        var lineGen = d3.svg.line()
          .x(function(d) {
            return xTrans(d[0])
          })
          .y(function(d) {
            return yTrans(d[1])
          })
          // .interpolate("basis")

        // Create the path element that will be the data line and apply styles
        chart.append('path')
        // The class is line followed by the 3 letter country code
          .attr("class", "line" + data[i][0])
          // This is the list that contains the x, y data
          .attr('d', lineGen(data[i][3]))
          .attr('stroke', 'grey')
          .attr('fill', 'none')
  }


// Create temperature tooltip text
var toolTipTemp = chart.append("g")
  .attr("class","tooltip tooltipText")
  .style("display", "none")

var toolTipDate = chart.append("g")
  .attr("class", "tooltip tooltipText")
  .style("display", "none")


d3.selectAll(".tooltipText")
  .append("rect")
  .attr("class", "tooltip")
  .attr("position", "absolute")
  .attr("y", -0.05*height)
  .style("width", 0.3* width)
  .style("height", 0.08* height)
  .style("padding", 8)
  .style("fill", "#cce5ff")

tooltipsText = d3.selectAll(".tooltipText")
tooltipsText
  .append("text")
  .attr("class", "tooltip tooltipText")
  .style("font-size", fontSize2)


// add cross hairs and floating value on axis

dataDot = chart.append("g")
    .attr("class", "dataDot")
    .append("circle")
    .attr("r", 5)
    .style("display", "none")
    
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
  if (countryCode != ""){
    tooltipGroup.style("display", "none")
    dataDot.style("display", "none")
  }
}

function mouseout() {
  if (countryCode != ""){
  dataDot.style("display", "none")
  tooltipGroup.style("display", "none")
  clearTimeout(timeOut)
  }
}

// This map is used to map the 0 to 11 values from the getMonth() 
// function to actual month strings
monthMap = ["Januarie", "Februari", "March", "April", "Mai", "June", "Juli", "August", "September", "Oktober", "November", "December"]

function mousemove() {
  if (countryCode != ""){
    // Hide the tooltip text boxes but not the lines
    tooltipGroup.style("display", "block")
    dataDot.style("display", "block")
    tooltipsText.style("display", "none")
    // Save the mouse position
    mouseX = d3.event.pageX
    mouseY = d3.event.pageY
    // Update the crosshairs
    year = Math.round(xTrans.invert(mouseX - margin.left - 500))
    console.log(year)
    xTranslation = (mouseX - margin.left - 500)
    yTranslation = yTrans(dataDict[countryCode][0][year])
    // crossHairs.attr("transform", "translate(" + xTranslation + "," + yTranslation + ")")
    dataDot.attr("transform", "translate(" + xTranslation + "," + yTranslation + ")")
    
    // Set the time out for the tooltip
    timeOut = setTimeout(function() {
    
      toolTipTemp.attr("transform", "translate(" + (xTranslation + 0.05*width) + "," + (yTranslation + 0.05*height) + ")")
      toolTipTemp.select("text").text(year)

      toolTipDate.attr("transform", "translate(" + (xTranslation + 0.00*width) + "," + (yTranslation - 0.1*height) + ")")
      toolTipDate.select("text").text(dataDict[countryCode][0][year] + " fertility rate")

      
      tooltipsText.style("display", "block")
      clearTimeout(timeOut)
    // The delay is speciefied at the top of the file  
    }, delay)
  }
}



