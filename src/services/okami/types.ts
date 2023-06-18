import { z } from "zod";

export const workSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  hasNewChapter: z.boolean(),
  chapter: z.number(),
});

export const updateWorkSchema = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    url: z.string().optional(),
    chapter: z.number().optional(),
  }),
});

export const fetchAllWorksUnreadQuerySchema = z.array(workSchema);

export type Work = z.infer<typeof workSchema>;
export type UpdateWorkInput = z.infer<typeof updateWorkSchema>;
