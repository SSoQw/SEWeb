import React from 'react';
import { MapContainer, TileLayer, Circle, GeoJSON } from 'react-leaflet';
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
        fillOpacity: 1,
        color: 'green',
        weight: 2,
    };

    const serviceAreaStyle = {
        fillColor: 'blue',
        fillOpacity: 0.3,
        color: 'blue',
        weight: 3,
    };

    const futureAreaStyle = {
        fillColor: 'orange',
        fillOpacity: 1,
        color: 'orange',
        weight: 1,
    };

    // Center coordinates for the map
    const center: L.LatLngTuple = [44.0, -71];
    const circleCenter: L.LatLngTuple = [43.597532, -70.709917];
    const circleRadius = 25 * 1609;

    // Render the map
    return (
        <MapContainer center={center} zoom={8} style={{ height: '800px', width: '100%' }}>
            <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL"
                subdomains="abcd"
                minZoom={0}
                maxZoom={20}
            />

            {/* Draw the maine.json layer */}
            <GeoJSON data={MEJSONData} style={areaStyle} />

            {/* Draw the blue circle marker */}
            <Circle center={circleCenter} radius={circleRadius} pathOptions={serviceAreaStyle} />

            {/* Draw the newhampshire.json layer */}
            <GeoJSON data={NHJSONData} style={futureAreaStyle} />
        </MapContainer>
    );
};

export default ServiceMap;
