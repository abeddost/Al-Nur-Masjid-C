"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitDonationPledge, initialFormState } from "./actions";

export default function DonationForm() {
  const t = useTranslations("pages.donation.form");
  const [state, formAction, pending] = useActionState(
    submitDonationPledge,
    initialFormState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-brand-100 bg-white p-8 text-brand-800">
        {t("successMessage")}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-brand-100 bg-white p-8">
      <div>
        <label
          htmlFor="donor-name"
          className="block text-sm font-medium text-brand-800"
        >
          {t("nameLabel")}
        </label>
        <input
          id="donor-name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="donor-email"
          className="block text-sm font-medium text-brand-800"
        >
          {t("emailLabel")}
        </label>
        <input
          id="donor-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-brand-800"
          >
            {t("amountLabel")}
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            inputMode="decimal"
            placeholder="50"
            required
            className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-brand-800"
          >
            {t("purposeLabel")}
          </label>
          <select
            id="purpose"
            name="purpose"
            className="mt-1 w-full rounded-lg border border-brand-200 bg-white px-4 py-2 text-brand-900 focus:border-brand-500 focus:outline-none"
          >
            <option value={t("purposeGeneral")}>{t("purposeGeneral")}</option>
            <option value={t("purposeMosque")}>{t("purposeMosque")}</option>
            <option value={t("purposeQuranSchool")}>
              {t("purposeQuranSchool")}
            </option>
            <option value={t("purposeSocial")}>{t("purposeSocial")}</option>
          </select>
        </div>
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-600">{t("errorMessage")}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-brand-900 hover:bg-gold-400 disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
