// function createMap(earthquakes){

// let baseMaps ={
//     "Locations": streetmap
// };

// L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);
// let myMap= L.map("map-id",{
//     center:[],
//     zoom: 7,
//     layers:[streetmap]
// });
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
//  d3.json(url).then(function(data){
//     L.geoJson(data).addTo(myMap)
//  });
// }
// let queryUrl= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// d3.json(queryUrl).then(function (type) {
//     createFeatures(type.Feature);
//   });
// function createFeatures(earthquakes){

//  function onEachFeature(Feature, layer) {
//     layer.bindPopup(`<h3>${Feature.properties.place}</h3><hr><p>${new Date(Feature.properties.time)}</p>`);
//   }
//   let earthquake = L.geoJSON(earthquakes, {
//     onEachFeature: onEachFeature
//   });
//   createMap(earthquake);
// }
// function createMap(earthquake){
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })
//     let topo= L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//       });
//       let baseMaps ={
//         "Street Map": street,
//         "Topo": topo
//       };
//       let overlayMaps= {
//         Earthquake : earthquake
//       }
//       let myMap = L.map("map", {
//         center: [
//           37.09, -95.71
//         ],
//         zoom: 5,
//         layers: [street, earthquake]
//       });
//       L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//       }).addTo(myMap);
// }
// function createMarkers(response){
//     let magtitude = response.type.Feature;
//     let magMarkers =[];
//     for (let index =0; index< magtitude.length; index++){
//         let magtitudes= magtitude[index];
//         let magMarkers =L.marker([magtitudes.nst, magtitudes.dmin]).bindPopup("<h3>" + magtitude.size + "<h3><h3>dmin: " + magtitude.depth + "</h3>");
//         magMarkers.push(magMarkers);
//     }
//     createMap(L.layerGroup(magMarkers))
// }
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(createMarkers);




let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(queryUrl).then(function (response) {
    createFeatures(response.features);
});

function createFeatures(earthquake) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    let earthquakeLayer = L.geoJSON(earthquake, {
        onEachFeature: onEachFeature
    });

    createMap(earthquakeLayer);
}

function createMap(earthquake) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let baseMaps = {
        "Street Map": street,
        "Topo": topo
    };

    let overlayMaps = {
        Earthquake: earthquake
    };

    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, earthquake]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

function createMarkers(response) {
    let magnitudes = response.features;
    let magMarkers = [];

    for (let index = 0; index < magnitudes.length; index++) {
        let magnitude = magnitudes[index];
        let magMarker = L.marker([magnitude.geometry.coordinates[1], magnitude.geometry.coordinates[0]])
            .bindPopup("<h3>" + magnitude.properties.mag + "<h3><h3>Depth: " + magnitude.geometry.coordinates[2] + "</h3>");
        magMarkers.push(magMarker);
    }

    createMap(L.layerGroup(magMarkers));
}
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(createMarkers);




// function createMap(earthquakeLayer) {
//     // Check if the map already exists, and if so, remove it
//     if (myMap) {
//         myMap.remove();
//     }

//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');

//     let baseMaps = {
//         "Street Map": street,
//         "Topo": topo
//     };

//     let overlayMaps = {
//         Earthquake: earthquakeLayer
//     };

//     myMap = L.map("map", {
//         center: [37.09, -95.71],
//         zoom: 5,
//         layers: [street, earthquakeLayer]
//     });

//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);
// }

