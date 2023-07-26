
//openstreet

var map = L.map('map').setView([35.911161, -79.064123], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    var map;
    osm.addTo(map);
                
      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        var location = e.latlng
        L.marker(location).addTo(map)
        L.circle(location, radius).addTo(map);
     }
 
     function onLocationError(e) {
        alert(e.message);
     }
     
     function getLocationLeaflet() {
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
 
        map.locate({setView: true, maxZoom: 16});
     }

      // foursquare 
    
     
      async function getFoursquare(business) {
      myurl = "https://api.foursquare.com/v3/places/search?query="+business;
        
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3kUjUgaEqESMuj4omO1ZKurd4I0w/sONToSOJ35gU1L0='
        }
      };  

      let data = await fetch(myurl, options).then(response => response.json()).catch(err => console.error(err));
      return(data)
      }

        

    function processBusinesses(data) {
      console.log(data);
        let businesses = data.map((element) => {  
            let location = {
                name: element.name,
                lat: element.geocodes.main.latitude,
                long: element.geocodes.main.longitude
            };  
            return location
        })                                  
        return businesses
    }                           


    document.getElementById('submit').addEventListener('click', async (event) => {
        event.preventDefault()
        let business = document.getElementById('business').value
        let data = await getFoursquare(business)
        map.businesses = processBusinesses(data)
        map.addMarkers()
    })



