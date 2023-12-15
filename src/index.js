import {validatIp, addTileLayer, addOffset} from './helpers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector( '#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: true,
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon:markerIcon}).addTo(map);

async function getData() {
    if(validatIp(ipInput.value)) {
        await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=f9f7b9dd25e048068d0e8bcad6dd60eb&ip=${ipInput.value}`)
        .then(res => res.json())
        .then(setInfo)
    }   
}

function handleKey(e) {
    if(e.key === 'Enter') {
        getData();
    } 
}

function setInfo(mapData) {
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.country_code3 + ' ' + mapData.city;
    timezoneInfo.innerText = mapData.time_zone.name;
    ispInfo.innerText = mapData.isp;

    map.setView([mapData.latitude, mapData.longitude])
    L.marker([mapData.latitude, mapData.longitude], {icon: markerIcon}).addTo(map);
    matchMedia("(max-width: 1024px)").matches && addOffset(map);
    addOffset(map);
}