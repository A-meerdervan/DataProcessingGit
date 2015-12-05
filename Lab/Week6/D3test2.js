
// Create an horizontal barchart with SVG and d3

var data = [4, 8, 15, 16, 23, 42];

var svgWidth = 0.5 * window.innerWidth
    barHeight = 20;

var Xtranf = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);

var chart = d3.select(".barChart2")
    .attr("width", svgWidth)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", Xtranf)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return Xtranf(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
d3.select("body").append("svg")
	.attr("class", "barChart2")
	.style("width", svgWidth + "px")
	.style("height", svgWidth + "px")



// Create a horizonatl bar chart with HTML and d3
data = [30, 10, 12, 18, 26, 14]
barChart = d3.select(".barChart")
barChart.style("background-color", "whiteSmoke")
barChart.style("width", 0.5 * window.innerWidth)
// Create linear tranformation function
var Xtranf = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 0.5 * window.innerWidth]);


barChart.selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return Xtranf(d) + "px" })
    .text(function(d) { return d; });


d3.select("body").insert("p").html("hij doet het wel, d3 dan")

// Shit doen met circles, TUTORIAL: http://bost.ocks.org/mike/circles/
// circle.remove()
var circle = d3.select("body").selectAll("circle")

circle.style("fill", "steelblue");
circle.attr("r", 30);
// change x pos random
// circle.attr("cx", function() { return Math.random() * 720; });

// CASE: More data than elements and new elements are created
sizes = [32, 50, 80, 90]
circles = d3.select("svg").selectAll("circle").data(sizes)
circles.attr("cx", function(d, i) { return i * 100 + 30; });
circles.attr("r", function(d) { return Math.sqrt(d); })
circleEnter = circles.enter().append("circle");
circleEnter.attr("cy", 60).attr("cx", function(d, i) { return i * 100 + 30; }).attr("r", function(d) { return Math.sqrt(d); })

// CASE: les data than elements, remove the excess (van 4 naar 2 rondjes)
twoSizes = [ 50, 120]
circles = d3.select("svg").selectAll("circle").data(twoSizes)
circles.attr("r", function(d) { return Math.sqrt(d); })
d3.selectAll("circle").data(twoSizes).exit().remove()




