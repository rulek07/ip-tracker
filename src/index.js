import {validatIp, addTileLayer} from './helpers';
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
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon:markerIcon}).addTo(map);

function getData() {
    if(validatIp(ipInput.value)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_wIUajwx1iKz0h9edXLGNWn5Z2iAyE&ipAddress=${ipInput.value}`)
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
    locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
    timezoneInfo.innerText = mapData.location.timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([lat, lng])
    L.marker([lat, lon], {icon: markerIcon}).addTo(map);
}