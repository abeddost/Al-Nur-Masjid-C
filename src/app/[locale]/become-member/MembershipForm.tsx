"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitMembershipForm, initialFormState } from "./actions";

export default function MembershipForm() {
  const t = useTranslations("membership.form");
  const [state, formAction, pending] = useActionState(
    submitMembershipForm,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8 text-brand-800">
        {t("successMessage")}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-brand-800"
        >
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-800"
        >
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-brand-800"
        >
          {t("phoneLabel")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-brand-800"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{t("errorMessage")}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
