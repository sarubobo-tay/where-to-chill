mapboxgl.accessToken = 'pk.eyJ1Ijoib3ZlcmNvb2tlZHN1c2hpIiwiYSI6ImNrbGVzcDhkbTRvcTMzMXBsZzdqdjNzeWgifQ.tDKdkZvpdfCUl_TmS0nqKw';
const map = new mapboxgl.Map({
    container: 'mapOverview',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [103.8338,1.3395],
    zoom: 10.5
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    }));

map.on('load', function () {
    map.addSource('bars', {
        type: 'geojson',
        data:bars,
        cluster: true,
        clusterMaxZoom: 17, // Max zoom to cluster points on
        clusterRadius: 30 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'bars',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#FFC300',
                10,
                '#FF5733 ',
                50,
                '#C70039 ',
                300,
                '#900C3F',
                500,
                '#581845'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                10,
                30,
                50,
                40,
                80,
                50
            ],
            'circle-stroke-width':2,
            'circle-stroke-color':'grey'
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'bars',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'bars',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#00FF00',
            'circle-radius': 7,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'black'
        },
    });
    map.addLayer({
        id: 'unclustered-count',
        type: 'symbol',
        source: 'bars',
        filter: ['!',['has', 'point_count']],
        layout: {
            'text-field': '1',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 8
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('bars').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom+0.8
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
        const markUp = e.features[0].properties.mapPopUp;
        const coordinates = e.features[0].geometry.coordinates.slice();


        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                markUp
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
    map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
    });
});