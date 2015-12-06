
d3.select("body").append("p").html("First paragraph");
d3.select("body").append("p").html("Second paragraph").attr("class","p2");
d3.select("body").append("p").html("Third paragraph").attr("id","p3");

// Change through the id and class
d3.select(".p2").html("I'm classy");
d3.select("#p3").html("I've got ideas");

// selecteer het zoveelste element:
d3.select("p:nth-of-type(2)").html("aangepast met leipe selectie")

d3.selectAll("p").style("font-weight","bold");

d3.select("p").append("span")
.html("I'm a rebel child.")
.style("background-color","firebrick")

d3.selectAll("p").style("background-color","aliceblue")

// Select alles
d3.selectAll("body").style("background-color","whitesmoke")

// select meerdere tags
d3.selectAll("p, span").style("background-color","lawngreen")

d3.select("body").append("span").html("select me if you can")

 // maak alles niet meer bold
d3.selectAll("*").style("font-weight",null);

// alleen span bold
d3.selectAll("span").style("font-weight","bold");

// eerste span niet meer bold
d3.select("p").select("span").style("font-weight",null);

var fs=["10px","20px","30px"];
// bind data to DOM elements
var selection=d3.selectAll("p").data(fs);
// change style
selection.style("font-size", function(d){
	return d;
})

// je kan ook dit doen, dan returned ie gewoon elke data value op die plek
selection.style("font-size",String)

// Je kan een index counter gebruiken door function(d, i) te doen
d3.selectAll("p").style("font-size",function(d,i) {return 10*(i+1)+"px";})

// shit weg halen uit de DOM
d3.selectAll("p").remove()

// Alles weg halen uit de body
d3.select("body").selectAll("*").remove()

// Nieuwe p's maken en vullen met text


// Met deze truc kun je iets alleen de eerste keer aanmaken en daarna komt er
// niets bij dan is het gewoon chill. Dat komt doordat je dataset 1 lang is en al is ie al gemaakt
// dan is er ook 1 element dus gaat enter niets doen en insert dus ook niet. 
d3.select("body").selectAll("h1").data(["Tutorial D3 jeromecukier.net"]).enter().insert("h1").html(String)
// of: 
d3.select("body").selectAll("h1").data([{}]).enter().insert("h1").html("My title")

var text=["first paragraph","second paragraph","third paragraph"];

// CASE: Je wilt shit linken aan data maar er zijn nog geen elementen
// SelectAll returned niets want er zijn geen p's op dit moment
// dan bind je data aan shit die er nog niet is, dan komt enter
// en enter maakt empty placeholders voor de 3 missende elementen
// dan worden ze echt gemaakt door append, nadat ze echt gemaakt zijn 
// kun je shit doen, zoals de html veranderen en de String functie 
// returned elk element uit de data set
d3.select("body").selectAll("p").data(text).enter().append("p").html(String)

// CASE: Minder data dan elementen maar je wilt de rest van de elementen wel behouden
// Als je minder data hebt dan elements dan veranderd ie gewoon de eerste
// LET OP!!! geen enter hier
text2=["hello world"]
d3.selectAll("p").data(text2).html(String)

// verander weer terug
d3.selectAll("p").remove();
d3.select("body").selectAll("p").data(text).enter().append("p").html(String);
// verander de eerste weer
d3.selectAll("p").data(text2).html(String)

// CASE: Je hebt minder data dan elementen en wilt de rest verwijderen
// je hebt nu 3 elementen en 1 data, exit selecteerd de elementen die niet gematched
// zijn, dan kan je daar iets mee doen
d3.selectAll("p").data(text2).exit().style("color","red");
// je kunt ze ook gewoon verwijderen
d3.selectAll("p").data(text2).exit().remove();

// CASE: Meer data dan elementen en je wilt excess data niet gebruiken:
// Je gebruikt geen enter of weet ik het wat dus hij moet het doen met de enige p 
// die die vindt. 
d3.selectAll("p").data(text).html(String);

// Shit doen met circles, TUTORIAL: http://bost.ocks.org/mike/circles/
var circle = d3.selectAll("circle");
circle.style("fill", "steelblue");
circle.attr("r", 30);













