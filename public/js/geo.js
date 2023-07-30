const geoWipe = document.getElementById('geowipe')
const locateMe = document.getElementById('locate')
const geoDiv = document.getElementById('geolabel')


var mapset = "no"
let google_map
let map;
let lat, lon;

// async function geoLocate() {
//     if (mapset === "no") {
//         try {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;

//                 const mapElement = document.createElement('div');
//                 mapElement.id = 'map';
//                 geoDiv.append(mapElement);
//                 const mapDiv = document.getElementById('map');
//                 const coordinates = { lat: lat, lng: lon };

//                 googleMapScript.onload = () => {
//                     const google = window.google;
//                     const map = new google.maps.Map(mapDiv, {
//                         zoom: 15,
//                         center: coordinates,
//                         mapId: "DEMO_MAP_ID",
//                     });
//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: coordinates,
//                         title: "Uluru",
//                     });
//                 };
//                 document.head.appendChild(googleMapScript);
//             });
//         } catch (error) {
//             console.error(error);
//         }
//         mapset = "yes";

//     } else {
//         alert("Please clear location before trying to locate again!");
//     }
// }
// async function geoLocate() {
//     if (mapset === "no") {
//         try {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;

//                 const mapElement = document.createElement('div');
//                 mapElement.id = 'map';
//                 geoDiv.append(mapElement);
//                 const mapDiv = document.getElementById('map');
//                 const coordinates = { lat: lat, lng: lon };

//                 const googleMapScript = document.createElement('script');
//                 googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBM96ZlN_58vdEA7F5hbOyZSLkq_4Q5OuQ&libraries=places`;
//                 googleMapScript.onload = () => {
//                     const google = window.google;
//                     const map = new google.maps.Map(mapDiv, {
//                         zoom: 15,
//                         center: coordinates,
//                         mapId: "DEMO_MAP_ID",
//                     });

//                     const marker = new google.maps.Marker({
//                         map: map,
//                         position: coordinates,
//                         title: "Uluru",
//                     });
//                 };

//                 document.head.appendChild(googleMapScript);
//             });
//         } catch (error) {
//             console.error(error);
//         }

//         mapset = "yes";
//     } else {
//         alert("Please clear location before trying to locate again!");
//     }
// }


async function geoLocate() {
    if (mapset === "no") {

        try {
            navigator.geolocation.getCurrentPosition(position => {

                var lat = position.coords.latitude
                var lon = position.coords.longitude

                const mapElement = document.createElement('div')
                mapElement.id = 'map';
                geoDiv.append(mapElement)
                const mapDiv = document.getElementById('map')
                const coordinates = { lat: lat, lng: lon }

                const Map = google.maps.importLibrary("maps")
                const AdvancedMarkerElement = google.maps.importLibrary("marker")

                google_map = new google.maps.Map(mapDiv, {
                    zoom: 15,
                    center: coordinates,
                    mapId: "DEMO_MAP_ID",
                })

                const marker = new AdvancedMarkerElement({
                    map: google_map,
                    position: coordinates,
                    title: "Uluru",
                })
                lat = null
                lon = null
            })
        } catch (error) {
            console.log(error);
        }
        mapset = "yes"
    } else {
        alert("Please clear location before trying to locate again!")
    }
}

function wipeGeo() {
    alert("Wiping Geolocation Data.......")
    const divToRemove = document.getElementById('map')
    divToRemove.remove()
    mapset = "no"
}

geoWipe.addEventListener("click", wipeGeo)
locateMe.addEventListener("click", geoLocate)