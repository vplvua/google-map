(function() {
    
    let map;
    let geocoder;
    let addressList;
    const locations = [];

    function initMap() {
        
        map = new google.maps.Map(document.getElementById("test-map"), {
            center: { lat: 48.3794, lng: 31.1656 },
            zoom: 5,
        });

        geocoder = new google.maps.Geocoder();
    
        const infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true,
        });



            for (let i = 0; i < addressList.length; i++) {
                geocoder.geocode({ address: `${addressList[i].street} ${addressList[i].house} ${addressList[i].city} ${addressList[i].zip}`, region: 'UA' }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                                    locations[i] = {
                                        name: addressList[i].osbb_name,
                                        position: { 'lat': results[0].geometry.location.lat(), 'lng': results[0].geometry.location.lng() }
                                    }
                                }
                });
            }
        
            console.log(locations.length, locations);    

            const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const markers = [];
            let position = {};
            let label = [];
            let marker;
    
            for (let i = 0; i < locations.length; i++) {
                position = locations[i].position;
                label = labels[i % labels.length];
                marker = new google.maps.Marker({
                    position,
                    label,
                });
    
                marker.addListener("click", () => {
                    infoWindow.setContent(locations[i].name);
                    infoWindow.open(map, marker);
                });
    
                markers[i] = marker;
    
            }

            console.log(markers);
    

        // console.log(locations);    

        // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // // Add some markers to the map.
        // // const markers = locations.map((element, i) => {
        // //     const label = labels[i % labels.length];
        // //     const marker = new google.maps.Marker({
        // //         element,
        // //         label,
        // //     });

        // //     marker.addListener("click", () => {
        // //         infoWindow.setContent(element);
        // //         infoWindow.open(map, marker);
        // //     });

        // //     return marker;
        // // });

        // const markers = [];
        // let position = {};
        // let label = [];

        // for (let i = 0; i < locations.length; i++) {
        //     position = locations[i].position;
        //     label = labels[i % labels.length];
        //     const marker = new google.maps.Marker({
        //         position,
        //         label,
        //     });

        //     marker.addListener("click", () => {
        //         infoWindow.setContent(locations[i].name);
        //         infoWindow.open(map, marker);
        //     });

        //     markers[i] = marker;

        // }


        // Add a marker clusterer to manage the markers.
        new markerClusterer.MarkerClusterer({ map, markers });
    }

    // const locations = [
    //     { lat: 50.45466, lng: 30.5238 },
    //     { lat: 49.842957, lng: 24.031111 },
    //     { lat: 46.482952, lng: 30.712481}
    // ];

    async function loadAdresses() {
        const response = await fetch('for-map.json');
        addressList = await response.json();
    }

    loadAdresses();

    window.initMap = initMap;

})()

