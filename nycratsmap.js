// initialize map
let map = L.map('map').setView([40.7194568,-74.0070207], 11);

let mapboxUrl = 'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.{ext}?access_token={accesToken}'
let accesToken = 'pk.eyJ1IjoiZ3VpbGxlbW9udGVjaW5vcyIsImEiOiJjanhqOXk1ajUyNG9tM3Rwa2k1NTA5Y3czIn0.empBgsAjclwQah1q9dLjiA'

L.tileLayer(mapboxUrl, {
    id: 'mapbox.dark',
    attribution : '',
    maxZoom: 20,
    minZoom: 0,
    ext: 'png',
    accesToken: accesToken
}).addTo(map)

$.getJSON('nyc__rat-counts-by-neighborhood__201903-201905.geojson', function(data){
    L.geoJson(data, {
        style: function(feature){
            let fillColor,
                value = feature.properties.ratCount
            // TODO: clusters not assigned properly
            if(value > 47) fillColor = '#166daa'
            else if(value > 39) fillColor = '#1a73ad'
            else if(value > 22) fillColor = '#1f76b0'
            else if(value > 14) fillColor = '#237bb1'
            else if(value > 10) fillColor = '#2983b7'
            else if(value > 8) fillColor = '#3c96c2'
            else if(value > 4) fillColor = '#73c3c4'
            else if(value > 0) fillColor = '#fff9e9'            
            return {color: "#fcfcfc", weight: .5, fillColor: fillColor, fillOpacity: .92}
        }
    }).addTo(map)
})