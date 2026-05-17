import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is too short").max(120),
  message: z.string().min(10, "Tell me a bit more").max(4000),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
