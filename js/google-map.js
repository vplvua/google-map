function initMap() {
    const map = new google.maps.Map(document.getElementById("test-map"), {
        mapId: '9669c36555925e2e',
        zoom: 5,
        center: {lat: 48.3794, lng: 31.1656},
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });
    const markers = locations.map((element) => {
        const marker = new google.maps.Marker();
        marker.setPosition(element.position);
        const infowindow = new google.maps.InfoWindow();
        marker.addListener('click', () => {
            infowindow.open({anchor: marker, map});
            infowindow.setContent(element.osbb_name);
        });
        return marker;
    });
    new markerClusterer.MarkerClusterer({map, markers});
};

let locations = [];
async function loadLocations() {
    const response = await fetch('for-map.json');
    locations = await response.json();
    window.initMap = initMap();
};

loadLocations();
