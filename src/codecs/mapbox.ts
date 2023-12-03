import * as z from "zod";

const MapboxPlaceTypeC = z.array(z.literal("address"));
const MapboxFeatureC = z.object({
  address: z.string().optional(),
  place_name: z.string(),
  place_type: MapboxPlaceTypeC
});
export type MapboxFeature = z.infer<typeof MapboxFeatureC>;
export const MapboxDataC = z.object({
  features: z.array(MapboxFeatureC)
});