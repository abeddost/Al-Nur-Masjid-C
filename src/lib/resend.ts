import { Resend } from "resend";

export const CONTACT_RECIPIENT = "info@afgkv.de";
export const MAIL_FROM = "An-Nur Website <onboarding@resend.dev>";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}
