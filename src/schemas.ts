import { z } from "zod";

export const FilterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  status: z.string(),
  specie: z.string(),
  gender: z.string(),
});