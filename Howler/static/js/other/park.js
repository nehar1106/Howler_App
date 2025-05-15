import api from './APIClient.js';

/**
 * Initialize leaflet map, called from HTML.
 */
function initMap(lat, lon) {
  console.log("In parks.js --> initMap");
  var map = L.map('map').setView([lat, lon], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
}


// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

//Retrieve park
api.getParkById(id).then(park => {
  console.log("In parks.js --> getParkById");
  initMap(park.lat, park.lon);
  document.title = 'North Carolina Parks - ' + park.name;

  document.querySelectorAll('.park-name').forEach(element => {
    element.innerHTML = park.name;
  });

  let countiesList = document.querySelector('#counties');
  park.county.forEach(county => {
    const countyTag = document.createElement('span');
    countyTag.classList.add('county');
    countyTag.innerHTML = county;
    countiesList.appendChild(countyTag);
  });


}).catch(() => {
  document.location = "/error";
});
