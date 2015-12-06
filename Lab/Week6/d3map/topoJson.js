!function(){function a(a,b,c){return this.svg=m.select(a).append("svg").attr("width",c||a.offsetWidth).attr("data-width",c||a.offsetWidth).attr("class","datamap").attr("height",b||a.offsetHeight).style("overflow","hidden"),this.options.responsive&&(m.select(this.options.element).style({position:"relative","padding-bottom":"60%"}),m.select(this.options.element).select("svg").style({position:"absolute",width:"100%",height:"100%"}),m.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect","non-scaling-stroke")),this.svg}function b(a,b){var c,d,e=b.width||a.offsetWidth,f=b.height||a.offsetHeight,g=this.svg;return b&&"undefined"==typeof b.scope&&(b.scope="world"),"usa"===b.scope?c=m.geo.albersUsa().scale(e).translate([e/2,f/2]):"world"===b.scope&&(c=m.geo[b.projection]().scale((e+1)/2/Math.PI).translate([e/2,f/("mercator"===b.projection?1.45:1.8)])),"orthographic"===b.projection&&(g.append("defs").append("path").datum({type:"Sphere"}).attr("id","sphere").attr("d",d),g.append("use").attr("class","stroke").attr("xlink:href","#sphere"),g.append("use").attr("class","fill").attr("xlink:href","#sphere"),c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)),d=m.geo.path().projection(c),{path:d,projection:c}}function c(){m.select(".datamaps-style-block").empty()&&m.select("head").append("style").attr("class","datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')}function d(a){var b=this.options.fills,c=this.options.data||{},d=this.options.geographyConfig,e=this.svg.select("g.datamaps-subunits");e.empty()&&(e=this.addLayer("datamaps-subunits",null,!0));var f=n.feature(a,a.objects[this.options.scope]).features;d.hideAntarctica&&(f=f.filter(function(a){return"ATA"!==a.id}));var g=e.selectAll("path.datamaps-subunit").data(f);g.enter().append("path").attr("d",this.path).attr("class",function(a){return"datamaps-subunit "+a.id}).attr("data-info",function(a){return JSON.stringify(c[a.id])}).style("fill",function(a){var d;return c[a.id]&&(d=b[c[a.id].fillKey]),d||b.defaultFill}).style("stroke-width",d.borderWidth).style("stroke",d.borderColor)}function e(){function a(){this.parentNode.appendChild(this)}var b=this.svg,c=this,d=this.options.geographyConfig;(d.highlightOnHover||d.popupOnHover)&&b.selectAll(".datamaps-subunit").on("mouseover",function(e){var f=m.select(this);if(d.highlightOnHover){var g={fill:f.style("fill"),stroke:f.style("stroke"),"stroke-width":f.style("stroke-width"),"fill-opacity":f.style("fill-opacity")};f.style("fill",d.highlightFillColor).style("stroke",d.highlightBorderColor).style("stroke-width",d.highlightBorderWidth).style("fill-opacity",d.highlightFillOpacity).attr("data-previousAttributes",JSON.stringify(g)),/((MSIE)|(Trident))/.test||a.call(this)}d.popupOnHover&&c.updatePopup(f,e,d,b)}).on("mouseout",function(){var a=m.select(this);if(d.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var c in b)a.style(c,b[c])}a.on("mousemove",null),m.selectAll(".datamaps-hoverover").style("display","none")})}function f(a,b){if(b=b||{},this.options.fills){var c="<dl>",d="";b.legendTitle&&(c="<h2>"+b.legendTitle+"</h2>"+c);for(var e in this.options.fills){if("defaultFill"===e){if(!b.defaultFillName)continue;d=b.defaultFillName}else d=b.labels&&b.labels[e]?b.labels[e]:e+": ";c+="<dt>"+d+"</dt>",c+='<dd style="background-color:'+this.options.fills[e]+'">&nbsp;</dd>'}c+="</dl>",m.select(this.options.element).append("div").attr("class","datamaps-legend").html(c)}}function g(){var a=m.geo.graticule();this.svg.insert("path",".datamaps-subunits").datum(a).attr("class","datamaps-graticule").attr("d",this.path)}function h(a,b,c){var d=this;if(this.svg,!b||b&&!b.slice)throw"Datamaps Error - arcs must be an array";"undefined"==typeof c&&(c=o.arcConfig);var e=a.selectAll("path.datamaps-arc").data(b,JSON.stringify),f=m.geo.path().projection(d.projection),g=m.geo.greatArc().source(function(a){return[a.origin.longitude,a.origin.latitude]}).target(function(a){return[a.destination.longitude,a.destination.latitude]});e.enter().append("svg:path").attr("class","datamaps-arc").style("stroke-linecap","round").style("stroke",function(a){return a.options&&a.options.strokeColor?a.options.strokeColor:c.strokeColor}).style("fill","none").style("stroke-width",function(a){return a.options&&a.options.strokeWidth?a.options.strokeWidth:c.strokeWidth}).attr("d",function(a){var b=d.latLngToXY(a.origin.latitude,a.origin.longitude),e=d.latLngToXY(a.destination.latitude,a.destination.longitude),h=[(b[0]+e[0])/2,(b[1]+e[1])/2];return c.greatArc?f(g(a)):"M"+b[0]+","+b[1]+"S"+(h[0]+50*c.arcSharpness)+","+(h[1]-75*c.arcSharpness)+","+e[0]+","+e[1]}).transition().delay(100).style("fill",function(){var a=this.getTotalLength();return this.style.transition=this.style.WebkitTransition="none",this.style.strokeDasharray=a+" "+a,this.style.strokeDashoffset=a,this.getBoundingClientRect(),this.style.transition=this.style.WebkitTransition="stroke-dashoffset "+c.animationSpeed+"ms ease-out",this.style.strokeDashoffset="0","none"}),e.exit().transition().style("opacity",0).remove()}function i(a,b){var c=this;b=b||{};var d=this.projection([-67.707617,42.722131]);this.svg.selectAll(".datamaps-subunit").attr("data-foo",function(e){var f=c.path.centroid(e),g=7.5,h=5;["FL","KY","MI"].indexOf(e.id)>-1&&(g=-2.5),"NY"===e.id&&(g=-1),"MI"===e.id&&(h=18),"LA"===e.id&&(g=13);var i,j;i=f[0]-g,j=f[1]+h;var k=["VT","NH","MA","RI","CT","NJ","DE","MD","DC"].indexOf(e.id);if(k>-1){var l=d[1];i=d[0],j=l+k*(2+(b.fontSize||12)),a.append("line").attr("x1",i-3).attr("y1",j-5).attr("x2",f[0]).attr("y2",f[1]).style("stroke",b.labelColor||"#000").style("stroke-width",b.lineWidth||1)}return a.append("text").attr("x",i).attr("y",j).style("font-size",(b.fontSize||10)+"px").style("font-family",b.fontFamily||"Verdana").style("fill",b.labelColor||"#000").text(e.id),"bar"})}function j(a,b,c){function d(a){return"undefined"!=typeof a&&"undefined"!=typeof a.latitude&&"undefined"!=typeof a.longitude}var e=this,f=this.options.fills,g=this.svg;if(!b||b&&!b.slice)throw"Datamaps Error - bubbles must be an array";var h=a.selectAll("circle.datamaps-bubble").data(b,JSON.stringify);h.enter().append("svg:circle").attr("class","datamaps-bubble").attr("cx",function(a){var b;return d(a)?b=e.latLngToXY(a.latitude,a.longitude):a.centered&&(b=e.path.centroid(g.select("path."+a.centered).data()[0])),b?b[0]:void 0}).attr("cy",function(a){var b;return d(a)?b=e.latLngToXY(a.latitude,a.longitude):a.centered&&(b=e.path.centroid(g.select("path."+a.centered).data()[0])),b?b[1]:void 0}).attr("r",0).attr("data-info",function(a){return JSON.stringify(a)}).style("stroke",function(a){return"undefined"!=typeof a.borderColor?a.borderColor:c.borderColor}).style("stroke-width",function(a){return"undefined"!=typeof a.borderWidth?a.borderWidth:c.borderWidth}).style("fill-opacity",function(a){return"undefined"!=typeof a.fillOpacity?a.fillOpacity:c.fillOpacity}).style("fill",function(a){var b=f[a.fillKey];return b||f.defaultFill}).on("mouseover",function(a){var b=m.select(this);if(c.highlightOnHover){var d={fill:b.style("fill"),stroke:b.style("stroke"),"stroke-width":b.style("stroke-width"),"fill-opacity":b.style("fill-opacity")};b.style("fill",c.highlightFillColor).style("stroke",c.highlightBorderColor).style("stroke-width",c.highlightBorderWidth).style("fill-opacity",c.highlightFillOpacity).attr("data-previousAttributes",JSON.stringify(d))}c.popupOnHover&&e.updatePopup(b,a,c,g)}).on("mouseout",function(){var a=m.select(this);if(c.highlightOnHover){var b=JSON.parse(a.attr("data-previousAttributes"));for(var d in b)a.style(d,b[d])}m.selectAll(".datamaps-hoverover").style("display","none")}).transition().duration(400).attr("r",function(a){return a.radius}),h.exit().transition().delay(c.exitDelay).attr("r",0).remove()}function k(a){return Array.prototype.slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a}function l(b){if("undefined"==typeof m||"undefined"==typeof n)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");return this.options=k(b,o),this.options.geographyConfig=k(b.geographyConfig,o.geographyConfig),this.options.projectionConfig=k(b.projectionConfig,o.projectionConfig),this.options.bubblesConfig=k(b.bubblesConfig,o.bubblesConfig),this.options.arcConfig=k(b.arcConfig,o.arcConfig),m.select(this.options.element).select("svg").length>0&&a.call(this,this.options.element,this.options.height,this.options.width),this.addPlugin("bubbles",j),this.addPlugin("legend",f),this.addPlugin("arc",h),this.addPlugin("labels",i),this.addPlugin("graticule",g),this.options.disableDefaultStyles||c(),this.draw()}var m=window.d3,n=window.topojson,o={scope:"world",responsive:!1,setProjection:b,projection:"equirectangular",dataType:"json",done:function(){},fills:{defaultFill:"#ABDDA4"},geographyConfig:{dataUrl:null,hideAntarctica:!0,borderWidth:1,borderColor:"#FDFDFD",popupTemplate:function(a){return'<div class="hoverinfo"><strong>'+a.properties.name+"</strong></div>"},popupOnHover:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2},projectionConfig:{rotation:[97,0]},bubblesConfig:{borderWidth:2,borderColor:"#FFFFFF",popupOnHover:!0,popupTemplate:function(a,b){return'<div class="hoverinfo"><strong>'+b.name+"</strong></div>"},fillOpacity:.75,animate:!0,highlightOnHover:!0,highlightFillColor:"#FC8D59",highlightBorderColor:"rgba(250, 15, 160, 0.2)",highlightBorderWidth:2,highlightFillOpacity:.85,exitDelay:100},arcConfig:{strokeColor:"#DD1C77",strokeWidth:1,arcSharpness:1,animationSpeed:600}};l.prototype.resize=function(){var a=this,b=a.options;if(b.responsive){var c="-webkit-transform"in document.body.style?"-webkit-":"-moz-transform"in document.body.style?"-moz-":"-ms-transform"in document.body.style?"-ms-":"",d=b.element.clientWidth,e=m.select(b.element).select("svg").attr("data-width");m.select(b.element).select("svg").selectAll("g").style(c+"transform","scale("+d/e+")")}},l.prototype.draw=function(){function a(a){b.options.dataUrl&&m[b.options.dataType](b.options.dataUrl,function(a){if("csv"===b.options.dataType&&a&&a.slice){for(var c={},d=0;d<a.length;d++)c[a[d].id]=a[d];a=c}Datamaps.prototype.updateChoropleth.call(b,a)}),d.call(b,a),e.call(b),(b.options.geographyConfig.popupOnHover||b.options.bubblesConfig.popupOnHover)&&(hoverover=m.select(b.options.element).append("div").attr("class","datamaps-hoverover").style("z-index",10001).style("position","absolute")),b.options.done(b)}var b=this,c=b.options,f=c.setProjection.apply(b,[c.element,c]);return this.path=f.path,this.projection=f.projection,c.geographyConfig.dataUrl?m.json(c.geographyConfig.dataUrl,function(c,d){if(c)throw new Error(c);b.customTopo=d,a(d)}):a(this[c.scope+"Topo"]||c.geographyConfig.dataJson),this},l.prototype.worldTopo="__WORLD__",l.prototype.usaTopo="__USA__",l.prototype.latLngToXY=function(a,b){return this.projection([b,a])},l.prototype.addLayer=function(a,b,c){var d;return d=c?this.svg.insert("g",":first-child"):this.svg.append("g"),d.attr("id",b||"").attr("class",a||"")},l.prototype.updateChoropleth=function(a){var b=this.svg;for(var c in a)if(a.hasOwnProperty(c)){var d,e=a[c];if(!c)continue;d="string"==typeof e?e:"string"==typeof e.color?e.color:this.options.fills[e.fillKey],e===Object(e)&&(this.options.data[c]=k(e,this.options.data[c]||{}),this.svg.select("."+c).attr("data-info",JSON.stringify(this.options.data[c]))),b.selectAll("."+c).transition().style("fill",d)}},l.prototype.updatePopup=function(a,b,c){var d=this;a.on("mousemove",null),a.on("mousemove",function(){var e=m.mouse(d.options.element);m.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top",e[1]+30+"px").html(function(){var d=JSON.parse(a.attr("data-info"));return c.popupTemplate(b,d)}).style("left",e[0]+"px")}),m.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display","block")},l.prototype.addPlugin=function(a,b){var c=this;"undefined"==typeof l.prototype[a]&&(l.prototype[a]=function(d,e,f,g){var h;"undefined"==typeof g&&(g=!1),"function"==typeof e&&(f=e,e=void 0),e=k(e||{},c.options[a+"Config"]),!g&&this.options[a+"Layer"]?(h=this.options[a+"Layer"],e=e||this.options[a+"Options"]):(h=this.addLayer(a),this.options[a+"Layer"]=h,this.options[a+"Options"]=e),b.apply(this,[h,d,e]),f&&f(h)})},"function"==typeof define&&define.amd?define("datamaps",function(a){return m=a("d3"),n=a("topojson"),l}):window.Datamap=window.Datamaps=l,window.jQuery&&(window.jQuery.fn.datamaps=function(a,b){a=a||{},a.element=this[0];var c=new l(a);return"function"==typeof b&&b(c,a),this})}();
