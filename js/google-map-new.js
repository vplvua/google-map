(function(){

    function initMap() {
        
        const map = new google.maps.Map(document.getElementById("test-map"), {
            zoom: 5,
            center: { lat: 48.3794, lng: 31.1656 },
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        const markers = locations.map((element) => {
            
            const marker = new google.maps.Marker();
            marker.setPosition(element.position);

            const infowindow = new google.maps.InfoWindow ();

            marker.addListener('click', () => {
                infowindow.open({ anchor: marker, map });
                infowindow.setContent(element.name);
            });

            return marker;
        });

        new markerClusterer.MarkerClusterer({ map, markers });

    }

    const locations = [
        { name: "ОСББ \"ЗУБРА ЛІСНА\"", position: { lat: 49.7868173, lng: 24.0496875 } },
        { name: "ОСББ \"СУПУТНИК-БІЛОГОРОДКА\"", position: { lat: 50.3773488, lng: 30.2292999 } },
        { name: "ОК \"ПРЕСТИЖ-БУД\"", position: { lat: 46.815727, lng: 35.3672299 } },
        { name: "ОСББ \"Будинок Модерн\"", position: { lat: 46.8478905, lng: 35.3638744 } },
        { name: "ОСББ \"Карпенка 22а\"", position: { lat: 49.5422769, lng: 25.5826257 } },
        { name: "ОСББ \"Гетьманський Двір 1223\"", position: { lat: 49.8705396, lng: 24.0327176 } },
    ];

    window.initMap = initMap();

})();