 	
	// The rawData has the id of the country and then the fertility rate per country 
	// It was done this way because the values have to be entered manualy so it saves
	// time to not have to write "", [] and comma signs al the time
	// The data of the countries of europe comes from: 
	// http://data.worldbank.org/indicator/SP.DYN.TFRT.IN/countries?order=wbapi_data_value_2013%20wbapi_data_value%20wbapi_data_value-last&sort=desc&display=default
 	
 	rawData = "fr2.0it1.4at1.4se1.9pt1.3de1.4dk1.7lv1.4ro1.5cz1.5fi1.8gb1.9ie2.0pl1.3be1.8bg1.5ee1.6es1.3hu1.3nl1.7sk1.3lt1.6gr1.3si1.6cy1.5lu1.6mt1.4"
 	dataPoints = []

 	for (var i = 0; i < rawData.length; i = i + 5) {
 		id = rawData[i] + rawData[ i + 1 ]
 		fertility = parseFloat(rawData[ i + 2 ] + rawData[ i + 3 ] + rawData[ i + 4 ])
 		dataPoints.push([id, fertility])
 	};
 	// The output of this log is copy pasted into a txt file to be read from the main3.js file with a XMLhttpRequest
 	console.log(JSON.stringify(dataPoints))