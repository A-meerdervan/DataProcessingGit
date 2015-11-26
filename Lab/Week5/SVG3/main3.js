

window.onload = function() {

 	rawData = document.getElementById("JSONdata").innerHTML
 	var dataPoints = JSON.parse(rawData)
 	
 	// Create the color map bases on values from http://colorbrewer2.org/
 	colorMap = new Map()
 	colorMap.set(1.3, "#b10026")
 	colorMap.set(1.4, "#e31a1c")
 	colorMap.set(1.5, "#fc4e2a")
 	colorMap.set(1.6, "#fd8d3c")
 	colorMap.set(1.7, "#feb24c")
 	colorMap.set(1.8, "#fed976")
 	colorMap.set(1.9, "#ffeda0")
 	colorMap.set(2.0, "#ffffcc")

 	applyColorMap(dataPoints)
}

// Change the fill color of a country in the svg map
function changeColor(countryTag, color) {
	countries = document.getElementsByClassName(countryTag)
	for (var i = countries.length - 1; i >= 0; i--) {
		countries[i].style.fill = color
	};
}

// color the map according to the data
function applyColorMap(dataPoints){
	for (var i = 0; i < dataPoints.length; i++) {
	 	var id = dataPoints[i][0]
	 	var fertility = dataPoints[i][1]
	 	changeColor(id, colorMap.get(fertility) )
	};
}