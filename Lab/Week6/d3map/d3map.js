// Get the data from the textarea and put it in data
data = []

textArea = document.getElementById("rawData").innerHTML

// THIS DID NOT WORK, because I am not a server
// Get the data from a Json file
// d3.json("d3line.json", function(d) {
//   rawData = d
// })
rawData = JSON.parse(textArea)

var onlyValues = rawData.map(function(obj){ return obj[1]; });
var minValue = Math.min.apply(null, onlyValues),
	maxValue = Math.max.apply(null, onlyValues);
console.log(minValue)
console.log(maxValue)

// Colours were taken from color brewer
// This function returns a color code for a data value
var getColor = function(fertilityRate){
	colorList = ["#081d58", "#253494" , "#225ea8", "#1d91c0","#41b6c4", "#7fcdbb", "#c7e9b4", "#edf8b1" ,"#ffffd9" ]
	colorLegend = [1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.0]

	for (var i = 0; i < colorLegend.length; i++) {	
		if (fertilityRate < colorLegend[i]){
			return colorList[i]
		}
	}
	// if the fertility rate is more than 7 return the last color
	return colorList[colorList.length - 1]
}

// Attach the colors to the data list
for (var i = 0; i < rawData.length; i++) {
  line = rawData[i]
  data.push([line[0], line[1], getColor(line[1])])
};

var dataset = {}
fillSet = {defaultFill: "green"}

data.forEach(function(countryData){ //
    // item example value ["USA", 70]
    var countryCode = countryData[0],
    value = countryData[1]
    dataset[countryCode] = { fillKey: countryData[2], fertilityRate: value }
	fillSet[countryData[2]] = countryData[2]
})

// render map
new Datamap({
    element: document.getElementById('container'),
    projection: 'mercator', // big world map
    // countries don't listed in dataset will be painted with this color
    fills: fillSet,//{ defaultFill: '#F5F5F5' },
    data: dataset,
    geographyConfig: {
    	// white borders
        borderColor: '#0000',
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
                '<p>', geo.properties.name, '</p>',
                '<br>Fertility rate: <strong>', data.fertilityRate, '</strong>',
                '</div>'].join('');
        }
    }
});
