import React from 'react';
import { MapContainer, TileLayer, Circle, GeoJSON } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import L from 'leaflet';
import { feature } from 'topojson-client';

import 'leaflet/dist/leaflet.css';
import nhTopoJSON from '../data/newhampshire.json';
import meTopoJSON from '../data/maine.json';

const ServiceMap = () => {
    // Custom map style for highlighting areas
    const areaStyle = {
        fillColor: 'green',
        fillOpacity: .5,
        color: 'green',
        weight: 0,
        opacity: .3,
    };

    const serviceAreaStyle = {
        fillColor: 'blue',
        fillOpacity: 0.3,
        color: 'blue',
        weight: 3,
    };

    const futureAreaStyle = {
        fillColor: 'orange',
        fillOpacity: .5,
        dashArray: '5, 5',
        color: 'orange',
        weight: 0,
        opacity: .5,
    };

    // Center coordinates for the map
    const center: L.LatLngTuple = [43.8, -70.5];
    const circleCenter: L.LatLngTuple = [43.597532, -70.709917];
    const circleRadius = 25 * 1609;

    // Convert the TopoJSON to GeoJSON
    // @ts-ignore
    const maineGeoJSON  = feature(meTopoJSON, meTopoJSON.objects.cb_2015_maine_county_20m);
    // @ts-ignore
    const nhGeoJSON = feature(nhTopoJSON, nhTopoJSON.objects.cb_2015_new_hampshire_county_20m);


    // Render the map
    return (
        <MapContainer center={center} zoom={8} style={{ height: '550px', width: '100%' }}>
            <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL"
                subdomains="abcd"
                minZoom={0}
                maxZoom={20}
            />

            {/* Draw the maine.json layer */}
            <GeoJSON data={maineGeoJSON} style={areaStyle} />

            {/* Draw the newhampshire.json layer */}
            <GeoJSON data={nhGeoJSON} style={futureAreaStyle} />

            {/* Draw the blue circle marker */}
            <Circle center={circleCenter} radius={circleRadius} pathOptions={serviceAreaStyle} />
        </MapContainer>
    );
};

export default ServiceMap;
