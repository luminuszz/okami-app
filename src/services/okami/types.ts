import { z } from "zod";

const workSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  hasNewChapter: z.boolean(),
  chapter: z.number(),
});

export const fetchAllWorksUnreadQuerySchema = z.array(workSchema);

export type Work = z.infer<typeof workSchema>;
