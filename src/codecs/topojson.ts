import * as z from "zod";

import type { 
  Positions,
  GeometryCollection,
  Point,
  MultiPoint,
  LineString,
  MultiLineString,
  Polygon,
  MultiPolygon,
  GeometryObject
} from "topojson-specification";

const PositionC = z.number().array();
export const PositionArrayC = PositionC.array() satisfies z.ZodType<Positions[]>;

const ArcIndexesC = z.number().array();
const ArcIndexesArrayC = ArcIndexesC.array();

const PointC = z.object({
  type: z.literal("Point"),
  coordinates: PositionC
}) satisfies z.ZodType<Point>;

const MultiPointC = z.object({
  type: z.literal("MultiPoint"),
  coordinates: PositionArrayC
}) satisfies z.ZodType<MultiPoint>;

const LineStringC = z.object({
  type: z.literal("LineString"),
  arcs: ArcIndexesC
}) satisfies z.ZodType<LineString>;

const MultiLineStringC = z.object({
  type: z.literal("MultiLineString"),
  arcs: ArcIndexesArrayC
}) satisfies z.ZodType<MultiLineString>;

const PolygonC = z.object({
  type: z.literal("Polygon"),
  arcs: ArcIndexesArrayC
}) satisfies z.ZodType<Polygon>;

const MultiPolygonC = z.object({
  type: z.literal("MultiPolygon"),
  arcs: ArcIndexesArrayC.array()
}) satisfies z.ZodType<MultiPolygon>;

const NullObjectC = z.object({ type: z.null() });

const GeometryObjectPartialUC = z.union([
  PointC, 
  MultiPointC, 
  LineStringC,
  MultiLineStringC, 
  PolygonC, 
  MultiPolygonC,
  NullObjectC
]);

const GeometryCollectionC: z.ZodType<GeometryCollection> = z.object({
  type: z.literal("GeometryCollection"),
  geometries: z.union([GeometryObjectPartialUC, z.lazy(() => GeometryCollectionC)]).array()
});

export const GeometryObjectC = z.union([
  GeometryObjectPartialUC, 
  GeometryCollectionC
]) satisfies z.ZodType<GeometryObject>;