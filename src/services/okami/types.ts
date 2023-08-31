import { z } from "zod";
import { parseISO } from "date-fns";

export const WORK_CATEGORY = z.enum(["MANGA", "ANIME"]);

export const workSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  hasNewChapter: z.boolean(),
  chapter: z.number(),
  isFinished: z.boolean(),
  imageUrl: z.string().url().nullable(),
  updatedAt: z.string().transform((value) => parseISO(value)),
  category: WORK_CATEGORY,
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

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarImageId: z.string().optional().nullable(),
  avatarImageUrl: z.string().optional().nullable().default(""),
});

export type User = z.infer<typeof UserSchema>;
export type Work = z.infer<typeof workSchema>;
export type UpdateWorkInput = z.infer<typeof updateWorkSchema>;
