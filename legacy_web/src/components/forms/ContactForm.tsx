"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Honeypot, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { ErrorNotice, SuccessPanel } from "@/components/ui/FormStatus";
import { postJson } from "@/lib/api";
import {
  validateContact,
  type ContactPayload,
  type FieldErrors,
  type SubmitState,
} from "@/lib/forms";
import { contactPage } from "@/lib/content/pages";

const blank: ContactPayload = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
  message: "",
  website: "",
  elapsed: 0,
};

export function ContactForm() {
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  // When the form appeared, used to reject submissions that arrive faster
  // than a person could have read it. Stamped in an effect rather than during
  // render, which must stay pure.
  const mounted = useRef(0);
  useEffect(() => {
    mounted.current = Date.now();
  }, []);

  const set = (key: keyof ContactPayload) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    // Clear a field's error the moment the user starts correcting it.
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.status === "submitting") return;

    const payload = { ...values, elapsed: Date.now() - mounted.current };
    const found = validateContact(payload);
    if (Object.keys(found).length) {
      setErrors(found);
      setState({
        status: "error",
        message: "Please review the highlighted fields.",
      });
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setState({ status: "submitting" });

    const res = await postJson("/api/contact", payload);
    if (res.ok) {
      setState({ status: "success", reference: res.reference });
      return;
    }
    if (res.fields) setErrors(res.fields);
    setState({ status: "error", message: res.message, fields: res.fields });
  }

  if (state.status === "success") {
    return (
      <SuccessPanel
        headline="Thank you — your inquiry is with us."
        body="We will review what you have shared to better understand your project and determine whether Consumer Services, Inc. may be able to assist. You will hear from us at the email address you provided."
        reference={state.reference}
      />
    );
  }

  const busy = state.status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <ErrorNotice state={state} />

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          placeholder="Your name"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <TextField
          label="Company / Organization"
          name="company"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
          placeholder="Business name"
          optional
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
          autoComplete="tel"
          placeholder="Optional"
          optional
        />
        <SelectField
          label="What are you interested in?"
          name="interest"
          value={values.interest}
          onChange={set("interest")}
          error={errors.interest}
          options={contactPage.form.interests}
          placeholder="Choose an area"
          className="sm:col-span-2"
          required
        />
        <TextArea
          label="Tell us what you’re working on"
          name="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          error={errors.message}
          placeholder="Briefly describe your business, project, or objective."
          className="sm:col-span-2"
          required
        />
      </div>

      <Honeypot value={values.website} onChange={set("website")} />

      <div className="mt-9 flex flex-wrap items-center gap-6">
        <Button type="submit" variant="gold" disabled={busy} withArrow={!busy}>
          {busy ? "Sending…" : "Submit Inquiry"}
        </Button>
        {busy ? (
          <span
            aria-hidden
            className="block size-4 animate-spin rounded-full border-2 border-brass-500/30 border-t-brass-600"
          />
        ) : null}
      </div>

      <p className="mt-6 max-w-[56ch] text-[0.8125rem] leading-relaxed text-ink-500">
        {contactPage.form.disclaimer}
      </p>
    </form>
  );
}
