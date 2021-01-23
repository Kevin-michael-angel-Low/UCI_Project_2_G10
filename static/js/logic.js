// Center of US

var usaMap = L.map("map-id", {
  center: [37.0902, -95.7129],
  zoom: 5.4
});

// California coordinates
// var caMap = L.map("map-id", {
//     center: [36.7783, -119.4179],
//     zoom: 6.5
//   });

// // Florida coordinates
// var flMap = L.map("map-id", {
//     center: [27.6648, -81.5158],
//     zoom: 7
//   });


var mapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(usaMap);

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(flMap);



var layers = {
  CA : new L.LayerGroup(),
  FL : new L.LayerGroup(),
};

var map = L.map("map-id", {
  center: [37.0902, -95.7129],
  zoom: 12,
  layers: [
    layers.CA,
    layers.FL,
  ]
});

var overlays = {
  "California": layers.CA,
  "Florida": layers.FL,
};

L.control.layers(null, overlays).addTo(usaMap);

var info = L.control({
  position: "topright"
});
// dropdown for CA and FL to relocate the map
// create marker 




