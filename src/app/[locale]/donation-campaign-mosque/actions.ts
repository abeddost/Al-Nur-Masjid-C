"use server";

import { getResendClient, CONTACT_RECIPIENT, MAIL_FROM } from "@/lib/resend";

export type FormState = { status: "idle" | "success" | "error" };

export const initialFormState: FormState = { status: "idle" };

export async function submitDonationPledge(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const amount = String(formData.get("amount") || "").trim();
  const purpose = String(formData.get("purpose") || "").trim();

  if (!name || !email || !amount) {
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
      subject: `New donation pledge from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nAmount: ${amount}\nPurpose: ${purpose || "-"}`,
    });
    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
