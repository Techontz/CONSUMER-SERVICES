import { NextResponse } from "next/server";
import { clientIp, forward, looksAutomated } from "@/lib/server/forward";
import { validateContact, type ContactPayload } from "@/lib/forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Malformed request." }, { status: 400 });
  }

  if (looksAutomated(body as unknown as Record<string, unknown>)) {
    // Answer as though it succeeded — telling a bot it was caught only
    // helps it try again differently.
    return NextResponse.json({ message: "Received." }, { status: 200 });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      {
        message: "Please review the highlighted fields.",
        errors: Object.fromEntries(
          Object.entries(errors).map(([k, v]) => [k, [v]]),
        ),
      },
      { status: 422 },
    );
  }

  return forward(
    "/api/v1/contact-inquiries",
    body as unknown as Record<string, unknown>,
    clientIp(req),
  );
}
