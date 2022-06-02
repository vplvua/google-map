// class AddressesList {
//     constructor() {
//         if (!AddressesList._instance) AddressesList._instance = this;
//         return AddressesList._instance;
//     }
//     async getAddresses() {
//         if (!this.addresses) {
//             this.addresses = await (await fetch('for-map.json')).json();
//         }
//         return this.addresses;
//     }
//     async getProductById(id) {
//         const products = await this.getProducts();
//         return products.find( product => product.id === id );
//     }
// }
(function() {  
    
    async function loadAdresses() {
        const response = await fetch('../json/for-map.json');
        const addressList = await response.json();
    
    const locations = [];

    for (let i = 0; i < addressList.length; i++) {
        let addressString = addressList[i].street + ', ' + addressList[i].house + ', ' + addressList[i].city + ', ' +  addressList[i].zip;
        geocoder.geocode({ 'address': addressString }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                locations[i] = {
                    name: addressList[i].osbb_name,
                    position: results[0].geometry.location
                }
            }
        });
    }

    console.log(locations);
}

loadAdresses();


})();