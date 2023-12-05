import mapboxgl from "mapbox-gl";
import fetch from "node-fetch";
import {MapboxDataC, MapboxFeature} from "../../../src/codecs/mapbox.js";

export const geocodeAddress = async (partialAddress: string) => {
  const center = new mapboxgl.LngLat(43.597532, -70.709917);

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(partialAddress)}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&country=us&proximity=${center.lng},${center.lat}&limit=4`
    );

    return MapboxDataC.parse(await response.json()).features
      .filter((feature: MapboxFeature) => feature.place_type.includes("address"))
      .map((feature: MapboxFeature) => feature.place_name);

  } catch (error) {
    console.error(error);
    throw new Error("Failed to geocode address");
  }
};