import { z } from "zod";

export const aboutSchema = z.object({
  short_introduction: z.string().min(1, "Short introduction is required"),
  long_biography: z.string().min(1, "Biography is required"),
  current_focus: z.string().min(1, "Current focus is required"),
  career_goal: z.string().min(1, "Career goal is required"),
  engineering_philosophy: z.string().min(1, "Philosophy is required"),
});

export type AboutInput = z.infer<typeof aboutSchema>;
