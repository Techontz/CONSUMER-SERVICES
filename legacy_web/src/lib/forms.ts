/**
 * Shared form types and client-side validation.
 *
 * The same rules are enforced again server-side by the Laravel API — this
 * layer exists so the user gets immediate, specific feedback, not so the
 * backend can trust the payload.
 */

export type FieldErrors = Record<string, string>;

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference?: string }
  | { status: "error"; message: string; fields?: FieldErrors };

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
  /** Honeypot — must stay empty. */
  website: string;
  /** Milliseconds the form was on screen before submission. */
  elapsed: number;
};

export type AssessmentPayload = {
  name: string;
  email: string;
  phone: string;
  stage: string;
  building: string;
  objective: string;
  challenge: string;
  timeline: string;
  website: string;
  elapsed: number;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function req(value: string, label: string, min = 2): string | null {
  const v = value.trim();
  if (!v) return `${label} is required.`;
  if (v.length < min) return `${label} looks too short.`;
  return null;
}

export function validateContact(v: ContactPayload): FieldErrors {
  const e: FieldErrors = {};
  const name = req(v.name, "Name");
  if (name) e.name = name;

  if (!v.email.trim()) e.email = "Email is required.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";

  if (v.phone.trim() && v.phone.trim().replace(/\D/g, "").length < 7)
    e.phone = "Enter a valid telephone number, or leave it blank.";

  const message = req(v.message, "This field", 20);
  if (message)
    e.message =
      v.message.trim().length === 0
        ? "Please tell us what you’re working on."
        : "Please add a little more detail — 20 characters or more.";

  if (!v.interest) e.interest = "Choose the area closest to your objective.";

  return e;
}

export function validateAssessment(v: AssessmentPayload): FieldErrors {
  const e: FieldErrors = {};
  const name = req(v.name, "Name");
  if (name) e.name = name;

  if (!v.email.trim()) e.email = "Email is required.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email address.";

  if (v.phone.trim() && v.phone.trim().replace(/\D/g, "").length < 7)
    e.phone = "Enter a valid telephone number, or leave it blank.";

  if (!v.stage) e.stage = "Select where the business is today.";
  if (!v.objective) e.objective = "Select your next objective.";

  if (v.building.trim().length < 20)
    e.building =
      "Please describe the business or project in a little more detail.";

  return e;
}
