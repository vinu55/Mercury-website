import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  serviceInterest: z.string().trim().min(2).max(100),
  message: z.string().trim().min(10).max(3000),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      service_interest: data.serviceInterest,
      message: data.message,
    });
    if (error) throw new Error("We could not send your enquiry. Please try WhatsApp or email us directly.");
    return { success: true };
  });
