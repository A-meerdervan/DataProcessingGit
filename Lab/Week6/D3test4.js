
  // USED to create JSON
  // dataTSV = [["l", 4],["r", 8],["f", 15],["j", 16],["s", 23],["k", 42]]
  // JSONdataTSV = JSON.stringify(dataTSV)
  // console.log(JSONdataTSV)

  // The JSON:
  rawData = document.getElementById("JSONdata").innerHTML
  var data = JSON.parse(rawData)


// TUT 3
  

totalWidth = window.innerWidth * 0.8
totalHeight = window.innerHeight* 0.5
var margin = {top: 0.04 * totalHeight, right: 0.02 * totalWidth, bottom: 0.05 * totalHeight, left: 0.04 * totalWidth},
    width =  totalWidth - margin.left - margin.right,
    height = totalHeight - margin.top - margin.bottom;

// Dit bind de data waarden 1 op 1 aan een range (equaly spaced)
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

// van height naar 0 omdat svg in de linkerbovenhoek zn origin heeft
var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Omdat het ordinal is doe je data.map(..)
  x.domain(data.map(function(d) { return d[0]; }));
  // nu is het gewoon weer normaal van 0 tot max data punt
  y.domain([0, d3.max(data, function(d) { return d[1]; })]);


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.7em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d[0]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return height - y(d[1]); });

function type(d) {
  d[1] = +d[1];
  return d;
}





// TUT 2

//   var width = 420,
//   barHeight = 20;

//   var x = d3.scale.linear()
//   .range([0, width]);

//   var chart = d3.select(".chart")
//   .attr("width", width);

//   x.domain([0, d3.max(data, function(d) { return d[1]; })]);

//   chart.attr("height", barHeight * data.length);

//   var bar = chart.selectAll("g")
//   .data(data)
//   .enter().append("g")
//   .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

//   bar.append("rect")
//   .attr("width", function(d) { return x(d[1]); })
//   .attr("height", barHeight - 1);

//   bar.append("text")
//   .attr("x", function(d) { return x(d[1]) - 3; })
//   .attr("y", barHeight / 2)
//   .attr("dy", ".35em")
//   .text(function(d) { return d[1]; });

//   function type(d) {
//   d[1] = +d[1]; // coerce to number
//   return d;
//   }