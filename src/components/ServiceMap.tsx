import React from 'react';
import { MapContainer, TileLayer, CircleMarker, GeoJSON } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import newHampshireGeoJSON from '../data/newhampshire.json';
import maineGeoJSON from '../data/maine.json';


const NHJSONData: GeoJSON.FeatureCollection = newHampshireGeoJSON as GeoJSON.FeatureCollection;
const MEJSONData: GeoJSON.FeatureCollection = maineGeoJSON as GeoJSON.FeatureCollection;


const ServiceMap = () => {
    // Custom map style for highlighting areas
    const areaStyle = {
        fillColor: 'green',
        fillOpacity: 0.3,
        color: 'green',
        weight: 1,
    };

    const serviceAreaStyle = {
        fillColor: 'blue',
        fillOpacity: 0.3,
        color: 'blue',
        weight: 1,
    };

    const futureAreaStyle = {
        fillColor: 'orange',
        fillOpacity: 0.3,
        color: 'orange',
        weight: 1,
    };

    // Center coordinates for the map
    const center: L.LatLngTuple = [43.93, -70.98];

    // Render the map
    return (
        <MapContainer center={center} zoom={8} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data &copy; OpenStreetMap contributors" />

            {/* Draw the maine.json layer */}
            <GeoJSON data={MEJSONData} style={areaStyle} />

            {/* Draw the blue circle marker */}
            <CircleMarker center={[43.61, -70.63]} radius={25} pathOptions={serviceAreaStyle} />

            {/* Draw the newhampshire.json layer */}
            <GeoJSON data={NHJSONData} style={futureAreaStyle} />
        </MapContainer>
    );
};

export default ServiceMap;
