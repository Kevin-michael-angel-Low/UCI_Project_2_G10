//put data here//
var cdata1 = [
  {
    name: "STANFORD HEALTH CARE",
    location: [37.68973, -121.89244],
    covid: [92.36, 76],
    time: ["July", "August"]
    
  },
  {
    name: "ALTA BATES SUMMIT MEDICAL CENTER",
    location: [37.85693, -122.25084],
    covid: [122.63, 90],
    time: ["July","August"]
  }
];
  

//change this code to create data from sql database (in my case from CSV)
//or this has to be array of objects-dictionaries this one is used for circles
var cdata2 = [
  {
    name: "STANFORD HEALTH CARE",
    location: [37.68973, -121.89244],
    covid: 92.36,
    time:"July"
    
  },
  {
    name: "STANFORD HEALTH CARE",
    location: [37.68973, -121.89244],
    covid: 76,
    time:"August"
    
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

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  OVER: new L.LayerGroup(),
  FULL: new L.LayerGroup()
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

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Over Occupied": layers.OVER,
  "Full Capacity": layers.FULL
 
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

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
  }),

};

// Perform an API call to the Citi Bike Station Information endpoint

 var updatedAt = "January, 2021";
   

    // Create an object to keep of the number of markers in each layer
var stationCount = {
    OVER: 0,
    FULL: 0
      
    };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var stationStatusCode;

    // Loop through the stations (they're the same size and have partially matching data)
for (var i = 0; i < cdata2.length; i++) {

      // Create a new station object with properties of both station objects, can add more after cdata[i] after comma
    var station = Object.assign({}, cdata2[i]);
      // If a station is listed but not installed, it's coming soon
    if (cdata2[i].covid<100) {
        stationStatusCode = "FULL";
    }
      // If a station has no bikes available, it's empty
     
      // If a station is installed but isn't renting, it's out of order
     // else if () {
     //   stationStatusCode = "OUT_OF_ORDER";
      //}
      
      // Otherwise the station is normal
    else {
        stationStatusCode = "OVER";
      }

      // Update the station count
  stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
  var newMarker = L.marker(cdata2[i].location, {
        icon: icons[stationStatusCode]
      });

      // Add the new marker to the appropriate layer
  newMarker.addTo(layers[stationStatusCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(cdata2[i].name + "<br> Capacity: " + cdata2[i].covid + "<br>");

// Loop through the cities array and create one marker for each city object

      
// Conditionals for countries points
  var color = "";
    if (cdata2[i].covid < 25) {
          color = "green";
        }
    else if (cdata2[i].covid < 50) {
          color = "yellow";
        }
    else if (cdata2[i].covid < 75) {
          color = "orange";
        }
    else if (cdata2[i].covid < 100) {
          color = "#FF0000";
        }

    else {
          color = "#8B0000";
        }
  
  L.circle(cdata2[i].location, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: cdata2[i].covid * 15
      }).addTo(map);
    }
    
    

    // Call the updateLegend function, which will... update the legend!
    //updateLegend(updatedAt, stationCount);


