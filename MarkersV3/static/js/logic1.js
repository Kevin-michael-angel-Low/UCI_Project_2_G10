var cdata2 = [{
        name: "STANFORD HEALTH CARE",
        location: [37.68973, -121.89244],
        covid: 92.36,
        time: "July"

    },
    {
        name: "STANFORD HEALTH CARE",
        location: [37.68973, -121.89244],
        covid: 76,
        time: "August"

    },

    {
        name: "ALTA BATES SUMMIT MEDICAL CENTER",
        location: [37.85693, -122.25084],
        covid: 122.63,
        time: "July"
    },
    {
        name: "ALTA BATES SUMMIT MEDICAL CENTER",
        location: [37.85693, -122.25084],
        covid: 90,
        time: "August"
    }
];

var cdates = [];
for (i = 0; i < 2; i++) {
    cdates.push(cdata2[i].time)
};






function createMap(t) {
    // Use d3 to select the panel with id of `#sample-metadata`
// Initialize all of the LayerGroups we'll be using
var layers = {
    OVER: new L.LayerGroup(),
    FULL: new L.LayerGroup()
};
// Create an overlays object to add to the layer control
var overlays = {
    "Over Occupied": layers.OVER,
    "Full Capacity": layers.FULL

};
// Create the map with our layers
var map = L.map("map-id", {
    center: [37.85693, -122.25084],
    zoom: 12,
    layers: [
        layers.OVER,
        layers.FULL
    ]
});
// Initialize an object containing icons for each layer group
var icons = {
    OVER: L.ExtraMarkers.icon({
        //icon: "ion-settings",
        iconColor: "white",
        markerColor: "red",
        //shape: "star"
    }),
    FULL: L.ExtraMarkers.icon({
        //icon: "ion-android-bicycle",
        iconColor: "white",
        markerColor: "yellow",
        //shape: "circle"
    })

};
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Add our 'lightmap' tile layer to the map
    lightmap.addTo(map);

    // Create a control for our layers, add our overlay layers to it
    L.control.layers(null, overlays).addTo(map);

    // Create a legend to display information about our map
    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };
    // Add the info legend to the map
    info.addTo(map);
    var fcdata2 = cdata2.filter(obj => obj.time == t);
    console.log(fcdata2);




    var updatedAt = "January, 2021";
    var covidCount = {
        OVER: 0,
        FULL: 0

    };

    console.log("A");

    var covidStatusCode;

    for (var i = 0; i < fcdata2.length; i++) {

        // Create a new station object with properties of both station objects, can add more after cdata[i] after comma
        var station = Object.assign({}, fcdata2[i]);
        // If a station is listed but not installed, it's coming soon
        if (fcdata2[i].covid < 100) {
            covidStatusCode = "FULL";
        } else {
            covidStatusCode = "OVER";
        }

        // Update the station count
        covidCount[covidStatusCode]++;
        // Create a new marker with the appropriate icon and coordinates
        var newMarker = L.marker(fcdata2[i].location, {
            icon: icons[covidStatusCode]
        });

        // Add the new marker to the appropriate layer
        newMarker.addTo(layers[covidStatusCode]);

        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup(fcdata2[i].name + "<br> Capacity: " + fcdata2[i].covid + "<br>");

        console.log("A-loop");



        // Conditionals for hospital capacity
        var color = "";
        if (fcdata2[i].covid < 25) {
            color = "green";
        } else if (fcdata2[i].covid < 50) {
            color = "yellow";
        } else if (fcdata2[i].covid < 75) {
            color = "orange";
        } else if (fcdata2[i].covid < 100) {
            color = "#FF0000";
        } else {
            color = "#8B0000";
        }
        console.log("B-loop");
        console.log(fcdata2[i])

        L.circle(fcdata2[i].location, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust radius
            radius: 1000 // fcdata2[i].covid * 15
        }).addTo(map);
        console.log("C-loop");


    }
}



function init() {

    var selector = d3.select("#selDataset");


    cdates.forEach(t => {
        selector
            .append("option")
            .text(t).property("value", t)



    });

    var firstSample = cdates[0];
    console.log(firstSample);

    createMap(firstSample);
    //buildMetadata(firstSample);

}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    //buildCharts(newSample);
    // buildMetadata(newSample);

    t = newSample;
    console.log(t);
    //document.getElementById('map').innerHTML = "<div id='map-id' style='width: 100%; height: 100%;'></div>";
    

    createMap(t);

}

init();