// Center of US
// var usaMap = L.map("map-id", {
//   center: [37.0902, -95.7129],
//   zoom: 5.4
// });

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

var map = L.map("map-id").setView([37.0902, -95.7129], 5.4);
L.tileLayer(
  "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
).addTo(map);

var mapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(map);



// LEGEND

var legend = L.control({ position: "topright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Hospital Capacity Legend</h4>";
  div.innerHTML += '<i style="background: green"></i><span>Less than 25%</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>Less than 50%</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>Less than 75%</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>Less than 100%</span><br>';
  div.innerHTML += '<i style="background: #8B0000"></i><span>Above 100%</span><br>';
  
  return div;
};

legend.addTo(map);

// TIMELINE FUNCTION
(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();