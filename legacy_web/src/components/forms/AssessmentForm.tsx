"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Honeypot, SelectField, TextArea, TextField } from "@/components/ui/Field";
import { ErrorNotice, SuccessPanel } from "@/components/ui/FormStatus";
import { postJson } from "@/lib/api";
import {
  validateAssessment,
  type AssessmentPayload,
  type FieldErrors,
  type SubmitState,
} from "@/lib/forms";
import { assessmentPage } from "@/lib/content/pages";

const blank: AssessmentPayload = {
  name: "",
  email: "",
  phone: "",
  stage: "",
  building: "",
  objective: "",
  challenge: "",
  timeline: "",
  website: "",
  elapsed: 0,
};

export function AssessmentForm() {
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

  const set = (key: keyof AssessmentPayload) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
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
    const found = validateAssessment(payload);
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

    const res = await postJson("/api/assessment", payload);
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
        headline="Your assessment is with us."
        body={assessmentPage.next.body}
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
          label="Where is the business today?"
          name="stage"
          value={values.stage}
          onChange={set("stage")}
          error={errors.stage}
          options={assessmentPage.stages}
          placeholder="Select a stage"
          required
        />
        <TextArea
          label="What are you building?"
          name="building"
          rows={4}
          value={values.building}
          onChange={set("building")}
          error={errors.building}
          placeholder="Briefly describe the business or project."
          className="sm:col-span-2"
          required
        />
        <SelectField
          label="What is your next objective?"
          name="objective"
          value={values.objective}
          onChange={set("objective")}
          error={errors.objective}
          options={assessmentPage.objectives}
          placeholder="Select an objective"
          required
        />
        <TextField
          label="When are you hoping to move forward?"
          name="timeline"
          value={values.timeline}
          onChange={set("timeline")}
          error={errors.timeline}
          placeholder="Your approximate timeline"
          optional
        />
        <TextArea
          label="What is creating the greatest challenge?"
          name="challenge"
          rows={4}
          value={values.challenge}
          onChange={set("challenge")}
          error={errors.challenge}
          className="sm:col-span-2"
          optional
        />
      </div>

      <Honeypot value={values.website} onChange={set("website")} />

      <div className="mt-9 flex flex-wrap items-center gap-6">
        <Button type="submit" variant="gold" disabled={busy} withArrow={!busy}>
          {busy ? "Sending…" : "Submit My Assessment"}
        </Button>
        {busy ? (
          <span
            aria-hidden
            className="block size-4 animate-spin rounded-full border-2 border-brass-500/30 border-t-brass-600"
          />
        ) : null}
      </div>

      <p className="mt-6 max-w-[56ch] text-[0.8125rem] leading-relaxed text-ink-500">
        Submitting this form does not create a consulting engagement or
        guarantee service availability.
      </p>
    </form>
  );
}
