import { MapContainer, TileLayer, Circle, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesdata from "../../data/statesdata.json";
import { LatLngTuple } from "leaflet";
import { GeoJsonObject } from "geojson";

const ServiceMap = () => {
  // Center coordinates for the map
  const center: LatLngTuple = [43.7, -70.709917];
  const circleCenter: LatLngTuple = [43.597532, -70.709917];
  const circleRadius = 30 * 1609;



  // Custom map style for highlighting areas
  const areaStyle = {
    fillColor: "green",
    fillOpacity: .5,
    color: "green",
    weight: 0,
    opacity: .3,
  };

  const serviceAreaStyle = {
    fillColor: "blue",
    fillOpacity: 0.3,
    color: "blue",
    weight: 3,
  };

  const futureAreaStyle = {
    fillColor: "orange",
    fillOpacity: .5,
    dashArray: "5, 5",
    color: "orange",
    weight: 0,
    opacity: .5,
  };

  // Render the map
  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={false} doubleClickZoom={false} style={{ height: "100%", width: "100%" }} zoomControl={false}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        subdomains="abcd"
        minZoom={0}
        maxZoom={20}
      />
      <GeoJSON
        data={statesdata as GeoJsonObject}
        style={(feature) => (feature && feature.properties.NAME === "Maine" ? areaStyle : futureAreaStyle)}
      />
      <Circle center={circleCenter} radius={circleRadius} pathOptions={serviceAreaStyle} />
    </MapContainer>
  );
};

export default ServiceMap;
