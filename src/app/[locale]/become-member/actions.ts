"use server";

import { getResendClient, CONTACT_RECIPIENT, MAIL_FROM } from "@/lib/resend";

export type FormState = { status: "idle" | "success" | "error" };

export const initialFormState: FormState = { status: "idle" };

export async function submitMembershipForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email) {
    return { status: "error" };
  }

  const resend = getResendClient();
  if (!resend) {
    return { status: "error" };
  }

  try {
    await resend.emails.send({
      from: MAIL_FROM,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New membership request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\n\nMessage:\n${message || "-"}`,
    });
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
