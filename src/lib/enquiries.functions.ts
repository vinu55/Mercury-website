
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
  .validator((data) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const enquiry = enquirySchema.parse(data);

    console.log("Enquiry received:", {
      ...enquiry,
      receivedAt: new Date().toISOString(),
    });

    throw new Error(
      "Online enquiry submission is temporarily unavailable. Please contact us by email or WhatsApp.",
    );
  });
