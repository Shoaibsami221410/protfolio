"use server";

import { contactSchema } from "@/lib/validations/contact";

export async function submitContact(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Validate on server
    contactSchema.parse(data);

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would implement your actual email sending logic
    // For example, using Resend:
    /*
    import { Resend } from "resend";
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "your-email@example.com",
      subject: validatedData.subject,
      text: `From: ${validatedData.name} (${validatedData.email})\n\n${validatedData.message}`,
    });
    */

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Contact submission error:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}
