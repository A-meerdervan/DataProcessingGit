/* use this to test out your function */
window.onload = function() {
	// color Poland, Sweden, Spain and Great britain
 	changeColor("pl", "#ff33ff")
 	changeColor("path3452", "#3399ff")
 	changeColor("path5998", "#f319ff")
 	changeColor("gb", "#3819ff")

}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */

function changeColor(id, color) {
	country = document.getElementById(id)
	country.style.opacity = 1
	country.style.fill = color
}