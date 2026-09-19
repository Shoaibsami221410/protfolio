import { z } from "zod";

export const homepageSchema = z.object({
  hero_eyebrow: z.string().min(1, "Eyebrow text is required"),
  hero_name: z.string().min(1, "Name is required"),
  hero_primary_role: z.string().min(1, "Primary role is required"),
  hero_secondary_role: z.string().min(1, "Secondary role is required"),
  hero_description: z.string().min(1, "Description is required"),
  hero_cta_primary_text: z.string().min(1, "Primary CTA text is required"),
  hero_cta_primary_url: z.string().min(1, "Primary CTA URL is required"),
  hero_cta_secondary_text: z.string().min(1, "Secondary CTA text is required"),
  hero_cta_secondary_url: z.string().min(1, "Secondary CTA URL is required"),
  hero_profile_image_id: z.string().optional().nullable(),
  hero_visibility: z.boolean(),
});

export type HomepageInput = z.infer<typeof homepageSchema>;
