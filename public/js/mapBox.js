mapboxgl.accessToken = 'pk.eyJ1Ijoib3ZlcmNvb2tlZHN1c2hpIiwiYSI6ImNrbGVzcDhkbTRvcTMzMXBsZzdqdjNzeWgifQ.tDKdkZvpdfCUl_TmS0nqKw';
var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: bar.geometry.coordinates, // starting position [lng, lat]
    zoom: 15 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    }));
var marker = new mapboxgl.Marker({ draggable: false })
    .setLngLat(bar.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>Name:${bar.name}<br> Price:${bar.price}</h5>`
            )
    )
    .addTo(map);

