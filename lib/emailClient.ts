import { Resend } from "resend";

/**
 * Built on first use rather than at import time.
 * `new Resend(undefined)` throws, and `next build` imports this module to collect
 * route data — long before any request, and often before env vars are available.
 */
let client: Resend | null = null;

function getResend(apiKey: string): Resend {
  if (!client) client = new Resend(apiKey);
  return client;
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    throw new Error("Email configuration is missing.");
  }

  const { name, email, message, projectType } = payload;

  const subject = projectType
    ? `Portfolio inquiry: ${projectType} — ${name}`
    : `Portfolio inquiry from ${name}`;

  const html = `
    <h2>New portfolio contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${projectType ? `<p><strong>Project type:</strong> ${projectType}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  return getResend(apiKey).emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject,
    html,
  });
}
