window.onload = function() {
	// color Poland, Sweden, Spain and Great britain
 	changeColor("pl", "#ff33ff")
 	changeColor("se", "#3399ff")
 	changeColor("es", "#f319ff")
 	changeColor("gb", "#3819ff")
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */

function changeColor(countryTag, color) {
	countries = document.getElementsByClassName(countryTag)
	for (var i = countries.length - 1; i >= 0; i--) {
		countries[i].style.fill = color
	};
}