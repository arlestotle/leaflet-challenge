// Using the past 7 days all earthquakes data from USGS
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Create base street map layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Put the United States as the center of the map
let map = L.map('map', {
    center: [35, -100],
    zoom: 4
});

// Add street map 
streetmap.addTo(map);

// Pull the data from the url and run a forloop that pulls selected information (coordinates, magnitude for size, depth for color, and additional info for fun) from each earthquake entry
d3.json(url).then(function(data) {
    info = data.features
    for (let i = 0; i < info.length; i++){
        coordinates = info[i].geometry.coordinates
        depth = info[i].geometry.coordinates[2]
        mag = info[i].properties.mag
        place = info[i].properties.place
        sig = info[i].properties.sig

        // The depth of the earth can be found as the third coordinate for each earthquake. 
        // Create a marker that that reflects depth of the earthquake by color
            // Select HEX color codes from google 
            color = {bright_green: '#14F353',
                    light_green: '#9DFA85',
                    yellow_orange: '#F7E54A',
                    orange: '#F7C64A',
                    orange_red: '#F79436',
                    red: '#FA3D0F'};

        // Marker colors earthquakes by the depth
        if (depth > 90){
            mapcolor = color['red']
        }else if (depth > 70){
            mapcolor = color['orange_red']
        }else if (depth > 50){
            mapcolor = color['orange']
        }else if (depth > 30){
            mapcolor = color['yellow_orange']
        }else if (depth > 10){
            mapcolor = color['light_green']
        }else (mapcolor = color['bright_green'])

        // Create makers on each earthquake using lat and lng
        let earthquake = L.circleMarker([coordinates[1], coordinates[0]], {
            fillColor: mapcolor,
            fillOpacity: .8,
            radius: mag * 2.5,
            weight: .5,
            color: 'black'});

        // Create pop up tip tool with additional information when you click on the earthquakes
        earthquake.bindPopup('Place: ' + place + 
                        '<br>Location: (' + coordinates[1] + ', ' + coordinates[0] + ')' +
                        '<br>Magnitude: ' + mag + 
                        '<br>Depth: ' + depth +
                        '<br>Significance: ' + sig)

        // Add to streetmap
        earthquake.addTo(map);
    };
});

// Select HEX color codes from google 
color = {bright_green: '#14F353',
        light_green: '#9DFA85',
        yellow_orange: '#F7E54A',
        orange: '#F7C64A',
        orange_red: '#F79436',
        red: '#FA3D0F'};

// Defline color levels and corresponding labels
var colorLevels = [-10, 10, 30, 50, 70, 90];
var colorLabels = [color['bright_green'], color['light_green'], color['yellow_orange'], color['orange'], color['orange_red'], color['red']];

// Create function to determine the color of marker based on the depth of the earthquake
function getColor(depth) {
    switch (true) {
        case depth > 90:
            return '#FA3D0F';
        case depth > 70:
            return '#F79436';
        case depth > 50:
            return '#F7C64A';
        case depth > 30:
            return '#F7E54A';
        case depth > 10:
            return '#9DFA85';
        default:
            return '#14F353';
        }
    }

// Create a legend 
var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'), 
        grades = colorLevels;
        labels = colorLabels;

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
// Add Legend to the Map
legend.addTo(map);
