import * as z from "zod"; 
import { GeometryObjectC, PositionArrayC } from "./topojson";
import type { Topology } from "topojson-specification";

export const TopologyC = z.object({
  type: z.literal("Topology"),
  objects: z.record(z.string(), GeometryObjectC),
  arcs: PositionArrayC.array()
}) satisfies z.ZodType<Topology>;