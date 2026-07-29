import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const to = process.env.CONTACT_EMAIL_TO;

  if (!process.env.RESEND_API_KEY || !to) {
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

  return resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject,
    html,
  });
}
