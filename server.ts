import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// ============================================================
// BASIC SETUP
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// ============================================================
// EMAIL CONFIGURATION
// ============================================================

const TARGET_NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ||
  "abhishekkuntare02@gmail.com";

const SMTP_HOST =
  process.env.SMTP_HOST ||
  "smtp.gmail.com";

const SMTP_PORT =
  Number(process.env.SMTP_PORT || 587);

const SMTP_USER =
  process.env.SMTP_USER ||
  "";

const SMTP_PASS =
  process.env.SMTP_PASS ||
  "";

const EMAIL_FROM =
  process.env.EMAIL_FROM ||
  `Abhishek Digital <${SMTP_USER || TARGET_NOTIFICATION_EMAIL}>`;

console.log("==============================================");
console.log("📧 EMAIL CONFIGURATION");
console.log("==============================================");
console.log("Provider: Gmail SMTP");
console.log("SMTP Host:", SMTP_HOST);
console.log("SMTP Port:", SMTP_PORT);
console.log("SMTP User:", SMTP_USER ? "configured" : "missing");
console.log("SMTP Password:", SMTP_PASS ? "configured" : "missing");
console.log("Notification Email:", TARGET_NOTIFICATION_EMAIL);
console.log("Environment:", process.env.VERCEL ? "Vercel" : "Local");
console.log("==============================================");

if (!SMTP_USER || !SMTP_PASS) {
  console.warn(
    "⚠️ SMTP_USER or SMTP_PASS is missing. Email sending will not work."
  );
}

// Create transporter.
// This does NOT send an email during startup.
const mailTransporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
      })
    : null;

// ============================================================
// DATA STORAGE
// ============================================================
//
// IMPORTANT:
// Vercel serverless functions do NOT provide persistent local
// storage. Therefore:
// - Local development -> data/*.json
// - Vercel -> memory only
//
// Email sending does NOT depend on filesystem storage.
// ============================================================

const IS_VERCEL = Boolean(process.env.VERCEL);

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const EMAIL_LOGS_FILE = path.join(DATA_DIR, "email_logs.json");

if (!IS_VERCEL) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (error) {
    console.warn(
      "Could not create local data directory:",
      error
    );
  }
}

// ============================================================
// TYPES
// ============================================================

type LeadStatus =
  | "New"
  | "Contacted"
  | "Proposal Sent"
  | "In Discussion"
  | "Won"
  | "Lost";

type EmailType =
  | "project_roadmap"
  | "contact_form"
  | "ai_blueprint"
  | "score_audit";

export interface EmailLogRecord {
  id: string;
  sentAt: string;
  to: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type: EmailType;
  summary: string;
  status: "sent" | "failed";
  notes?: string;
}

interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  businessNiche: string;
  servicesRequired: string[];
  platforms: string[];
  goals: string[];
  timeline: string;
  budgetRange: string;
  projectDescription: string;
  status: LeadStatus;
  notes?: string;
}

// ============================================================
// EMAIL LOG STORE
// ============================================================

const emailLogsStore: EmailLogRecord[] = [];

function saveEmailLogsToFile(): void {
  // NEVER attempt filesystem persistence on Vercel.
  if (IS_VERCEL) return;

  try {
    fs.writeFileSync(
      EMAIL_LOGS_FILE,
      JSON.stringify(emailLogsStore, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error(
      "Error writing email logs:",
      error
    );
  }
}

function loadEmailLogsFromFile(): void {
  if (IS_VERCEL) return;

  try {
    if (!fs.existsSync(EMAIL_LOGS_FILE)) {
      return;
    }

    const raw = fs.readFileSync(
      EMAIL_LOGS_FILE,
      "utf8"
    );

    const data = JSON.parse(raw);

    if (Array.isArray(data)) {
      emailLogsStore.length = 0;
      emailLogsStore.push(...data);
    }
  } catch (error) {
    console.error(
      "Error loading email logs:",
      error
    );
  }
}

loadEmailLogsFromFile();

// ============================================================
// HTML HELPERS
// ============================================================

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDateTime(
  date = new Date()
): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string): string {
  const parts = String(name || "User")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "US";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${
    parts[parts.length - 1][0]
  }`.toUpperCase();
}

function getFormTitle(
  type: EmailType
): string {
  switch (type) {
    case "project_roadmap":
      return "Project Roadmap Received";

    case "ai_blueprint":
      return "AI Blueprint Request Received";

    case "score_audit":
      return "Website Score Audit Received";

    default:
      return "New Client Inquiry";
  }
}

function getFormSubtitle(
  type: EmailType
): string {
  switch (type) {
    case "project_roadmap":
      return "A new project roadmap has been submitted through your website.";

    case "ai_blueprint":
      return "A new AI project blueprint request has been submitted.";

    case "score_audit":
      return "A new website score audit request has been submitted.";

    default:
      return "A new client inquiry has been submitted through your website.";
  }
}

function getTypeLabel(
  type: EmailType
): string {
  switch (type) {
    case "project_roadmap":
      return "PROJECT ROADMAP";

    case "ai_blueprint":
      return "AI BLUEPRINT";

    case "score_audit":
      return "SCORE AUDIT";

    default:
      return "NEW INQUIRY";
  }
}

function formatList(
  value?: string | string[]
): string {
  if (Array.isArray(value)) {
    return value.length
      ? value.join(", ")
      : "Not specified";
  }

  return value &&
    String(value).trim()
    ? String(value)
    : "Not specified";
}

// ============================================================
// PREMIUM EMAIL HTML
// ============================================================

function buildPremiumLeadEmail(params: {
  type: EmailType;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  businessName?: string;
  country?: string;
  niche?: string;
  services?: string | string[];
  platforms?: string | string[];
  goals?: string | string[];
  budget?: string;
  timeline?: string;
  message?: string;
  summary?: string;
  metadata?: Record<string, any>;
}) {
  const {
    type,
    senderName,
    senderEmail,
    senderPhone,
    businessName,
    country,
    niche,
    services,
    platforms,
    goals,
    budget,
    timeline,
    message,
    summary,
    metadata,
  } = params;

  const title = getFormTitle(type);
  const subtitle = getFormSubtitle(type);
  const typeLabel = getTypeLabel(type);
  const initials = getInitials(senderName);
  const timestamp = formatDateTime();

  const safeName = escapeHtml(
    senderName || "Website Visitor"
  );

  const safeEmail = escapeHtml(
    senderEmail || "Not provided"
  );

  const safePhone = escapeHtml(
    senderPhone || "Not provided"
  );

  const safeBusiness = escapeHtml(
    businessName || "Not specified"
  );

  const safeCountry = escapeHtml(
    country || "Not specified"
  );

  const safeNiche = escapeHtml(
    niche || "Not specified"
  );

  const safeServices = escapeHtml(
    formatList(services)
  );

  const safePlatforms = escapeHtml(
    formatList(platforms)
  );

  const safeGoals = escapeHtml(
    formatList(goals)
  );

  const safeBudget = escapeHtml(
    budget || "Not specified"
  );

  const safeTimeline = escapeHtml(
    timeline || "Not specified"
  );

  const safeSummary = escapeHtml(
    summary || ""
  );

  const safeMessage = escapeHtml(
    message || "No additional notes provided."
  ).replace(/\r?\n/g, "<br>");

  // ==========================================================
  // ACTION LINKS
  // ==========================================================

  const cleanPhone = String(
    senderPhone || ""
  ).replace(/\D/g, "");

  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hi ${senderName}, this is Abhishek from Abhishek Digital. I received your inquiry and would love to discuss your project.`
      )}`
    : "";

  const emailUrl = `mailto:${encodeURIComponent(
    senderEmail || ""
  )}?subject=${encodeURIComponent(
    `Re: ${title}`
  )}`;

  // ==========================================================
  // METADATA
  // ==========================================================

  const metadataRows = Object.entries(
    metadata || {}
  )
    .filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    )
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) =>
          char.toUpperCase()
        );

      const displayValue = Array.isArray(value)
        ? value.join(", ")
        : String(value);

      return `
        <tr>
          <td style="padding:8px 0;color:#7f8aa3;font-size:11px;width:145px;vertical-align:top;">
            ${escapeHtml(label)}
          </td>

          <td style="padding:8px 0;color:#e8edf5;font-size:12px;font-weight:600;vertical-align:top;">
            ${escapeHtml(displayValue)}
          </td>
        </tr>
      `;
    })
    .join("");

  const metadataSection = metadataRows
    ? `
      <tr>
        <td
          class="content-padding"
          style="padding:0 32px 16px;"
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background:#111827;
              border:1px solid #202a3d;
              border-radius:17px;
            "
          >
            <tr>
              <td style="padding:22px;">

                <div
                  style="
                    color:#38bdf8;
                    font-size:10px;
                    font-weight:800;
                    letter-spacing:1px;
                    text-transform:uppercase;
                    margin-bottom:8px;
                  "
                >
                  Additional Details
                </div>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  ${metadataRows}
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    : "";

  // ==========================================================
  // MESSAGE SECTION
  // ==========================================================

  const messageSection = `
    <tr>
      <td
        class="content-padding"
        style="padding:0 32px 16px;"
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background:#111827;
            border:1px solid #202a3d;
            border-radius:17px;
          "
        >
          <tr>
            <td style="padding:22px;">

              <div
                style="
                  color:#38bdf8;
                  font-size:10px;
                  font-weight:800;
                  letter-spacing:1px;
                  text-transform:uppercase;
                  margin-bottom:14px;
                "
              >
                Client Notes
              </div>

              <div
                style="
                  color:#cbd5e1;
                  font-size:13px;
                  line-height:22px;
                  word-break:break-word;
                "
              >
                ${safeMessage}
              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  // ==========================================================
  // WHATSAPP BUTTON
  // ==========================================================

  const whatsappButton = whatsappUrl
    ? `
      <td
        class="mobile-stack"
        style="padding-right:5px;"
      >
        <a
          href="${whatsappUrl}"
          class="mobile-button"
          style="
            display:inline-block;
            padding:13px 20px;
            background:#16a34a;
            border-radius:10px;
            color:#ffffff;
            font-size:12px;
            font-weight:800;
            text-decoration:none;
          "
        >
          WhatsApp Client
        </a>
      </td>
    `
    : "";

  // ==========================================================
  // HTML EMAIL
  // ==========================================================

  const html = `<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0"
/>

<title>${escapeHtml(title)}</title>

<style>

body {
  margin:0;
  padding:0;
  background:#f1f4f8;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  color:#111827;
}

table {
  border-collapse:collapse;
}

a {
  text-decoration:none;
}

@media only screen and (max-width:620px) {

  .email-wrapper {
    padding:12px!important;
  }

  .email-container {
    width:100%!important;
    border-radius:18px!important;
  }

  .content-padding {
    padding-left:20px!important;
    padding-right:20px!important;
  }

  .mobile-stack {
    display:block!important;
    width:100%!important;
    padding:0!important;
    margin-bottom:10px!important;
  }

  .mobile-button {
    display:block!important;
    text-align:center!important;
    width:100%!important;
  }

  .hero-title {
    font-size:25px!important;
    line-height:32px!important;
  }

}

</style>

</head>

<body>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f1f4f8;"
>

<tr>

<td
  align="center"
  class="email-wrapper"
  style="padding:35px 15px;"
>

<table
  width="620"
  cellpadding="0"
  cellspacing="0"
  border="0"
  class="email-container"
  style="
    max-width:620px;
    width:100%;
    background:#0b1020;
    border-radius:24px;
    overflow:hidden;
    box-shadow:0 20px 60px rgba(15,23,42,.18);
  "
>

<!-- HEADER -->

<tr>

<td
  style="
    padding:22px 28px;
    border-bottom:1px solid rgba(255,255,255,.08);
    background:#080d1a;
  "
>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td>

<table cellpadding="0" cellspacing="0">

<tr>

<td
  width="38"
  height="38"
  align="center"
  valign="middle"
  style="
    width:38px;
    height:38px;
    border-radius:11px;
    background:#ffffff;
    color:#080d1a;
    font-size:15px;
    font-weight:900;
  "
>
  AD
</td>

<td style="padding-left:11px;">

<div
  style="
    color:#ffffff;
    font-size:14px;
    font-weight:800;
  "
>
  Abhishek Digital
</div>

<div
  style="
    color:#7f8aa3;
    font-size:11px;
    margin-top:3px;
  "
>
  Digital Products & AI Solutions
</div>

</td>

</tr>

</table>

</td>

<td align="right">

<span
  style="
    display:inline-block;
    padding:7px 10px;
    border-radius:999px;
    background:rgba(34,197,94,.10);
    border:1px solid rgba(34,197,94,.25);
    color:#4ade80;
    font-size:10px;
    font-weight:800;
    letter-spacing:1px;
  "
>
  ● NEW LEAD
</span>

</td>

</tr>

</table>

</td>

</tr>

<!-- HERO -->

<tr>

<td
  class="content-padding"
  style="padding:34px 32px 28px;"
>

<div
  style="
    font-size:10px;
    font-weight:800;
    letter-spacing:1.5px;
    color:#38bdf8;
    margin-bottom:12px;
  "
>
  ${escapeHtml(typeLabel)}
</div>

<h1
  class="hero-title"
  style="
    margin:0;
    color:#ffffff;
    font-size:30px;
    line-height:38px;
    font-weight:800;
    letter-spacing:-.7px;
  "
>
  ${escapeHtml(title)}
</h1>

<p
  style="
    margin:12px 0 0;
    color:#929cb1;
    font-size:14px;
    line-height:22px;
  "
>
  ${escapeHtml(subtitle)}
</p>

<div
  style="
    margin-top:20px;
    color:#68748b;
    font-size:11px;
  "
>
  Received ${escapeHtml(timestamp)}
</div>

</td>

</tr>

<!-- CLIENT -->

<tr>

<td
  class="content-padding"
  style="padding:0 32px 16px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#111827;
    border:1px solid #202a3d;
    border-radius:17px;
  "
>

<tr>

<td style="padding:22px;">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td width="50" valign="top">

<div
  style="
    width:48px;
    height:48px;
    line-height:48px;
    text-align:center;
    border-radius:14px;
    background:#172033;
    border:1px solid #334155;
    color:#ffffff;
    font-size:16px;
    font-weight:800;
  "
>
  ${escapeHtml(initials)}
</div>

</td>

<td
  valign="top"
  style="padding-left:13px;"
>

<div
  style="
    color:#ffffff;
    font-size:16px;
    font-weight:750;
  "
>
  ${safeName}
</div>

<div
  style="
    color:#64748b;
    font-size:11px;
    margin-top:4px;
  "
>
  Client / Website Visitor
</div>

</td>

<td
  align="right"
  valign="top"
>

<span
  style="
    display:inline-block;
    padding:6px 9px;
    border-radius:8px;
    background:#172033;
    color:#94a3b8;
    font-size:10px;
    font-weight:700;
  "
>
  ${safeCountry}
</span>

</td>

</tr>

</table>

<div
  style="
    height:1px;
    background:#202a3d;
    margin:20px 0;
  "
></div>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  width="50%"
  valign="top"
  style="padding-right:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    text-transform:uppercase;
    letter-spacing:.7px;
    margin-bottom:5px;
  "
>
  Email
</div>

<a
  href="mailto:${escapeHtml(senderEmail || "")}"
  style="
    color:#38bdf8;
    font-size:12px;
    font-weight:600;
    word-break:break-word;
  "
>
  ${safeEmail}
</a>

</td>

<td
  width="50%"
  valign="top"
  style="padding-left:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    text-transform:uppercase;
    letter-spacing:.7px;
    margin-bottom:5px;
  "
>
  Phone / WhatsApp
</div>

<div
  style="
    color:#e2e8f0;
    font-size:12px;
    font-weight:600;
  "
>
  ${safePhone}
</div>

</td>

</tr>

</table>

<div style="height:14px;"></div>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  width="50%"
  valign="top"
  style="padding-right:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    text-transform:uppercase;
    letter-spacing:.7px;
    margin-bottom:5px;
  "
>
  Business
</div>

<div
  style="
    color:#e2e8f0;
    font-size:12px;
    font-weight:600;
  "
>
  ${safeBusiness}
</div>

</td>

<td
  width="50%"
  valign="top"
  style="padding-left:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    text-transform:uppercase;
    letter-spacing:.7px;
    margin-bottom:5px;
  "
>
  Industry
</div>

<div
  style="
    color:#f59e0b;
    font-size:12px;
    font-weight:700;
  "
>
  ${safeNiche}
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

<!-- PROJECT SNAPSHOT -->

<tr>

<td
  class="content-padding"
  style="padding:0 32px 16px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    background:#111827;
    border:1px solid #202a3d;
    border-radius:17px;
  "
>

<tr>

<td style="padding:22px;">

<div
  style="
    color:#38bdf8;
    font-size:10px;
    font-weight:800;
    letter-spacing:1px;
    text-transform:uppercase;
    margin-bottom:18px;
  "
>
  Project Snapshot
</div>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  width="50%"
  valign="top"
  style="padding-right:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    margin-bottom:7px;
  "
>
  SERVICES
</div>

<div
  style="
    color:#f8fafc;
    font-size:13px;
    line-height:20px;
    font-weight:600;
  "
>
  ${safeServices}
</div>

</td>

<td
  width="50%"
  valign="top"
  style="padding-left:8px;"
>

<div
  style="
    color:#64748b;
    font-size:10px;
    margin-bottom:7px;
  "
>
  PLATFORM
</div>

<div
  style="
    color:#f8fafc;
    font-size:13px;
    line-height:20px;
    font-weight:600;
  "
>
  ${safePlatforms}
</div>

</td>

</tr>

</table>

<div style="height:18px;"></div>

<div
  style="
    height:1px;
    background:#202a3d;
  "
></div>

<div style="height:18px;"></div>

<div
  style="
    color:#64748b;
    font-size:10px;
    margin-bottom:7px;
  "
>
  PRIMARY GOALS
</div>

<div
  style="
    color:#e2e8f0;
    font-size:13px;
    line-height:21px;
  "
>
  ${safeGoals}
</div>

</td>

</tr>

</table>

</td>

</tr>

<!-- BUDGET / TIMELINE -->

<tr>

<td
  class="content-padding"
  style="padding:0 32px 16px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td
  width="50%"
  style="padding-right:7px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#0f172a;
    border:1px solid #1e293b;
    border-radius:15px;
  "
>

<tr>

<td style="padding:18px;">

<div
  style="
    color:#64748b;
    font-size:10px;
    letter-spacing:.7px;
    text-transform:uppercase;
  "
>
  Estimated Budget
</div>

<div
  style="
    color:#4ade80;
    font-size:17px;
    font-weight:800;
    margin-top:8px;
  "
>
  ${safeBudget}
</div>

</td>

</tr>

</table>

</td>

<td
  width="50%"
  style="padding-left:7px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#0f172a;
    border:1px solid #1e293b;
    border-radius:15px;
  "
>

<tr>

<td style="padding:18px;">

<div
  style="
    color:#64748b;
    font-size:10px;
    letter-spacing:.7px;
    text-transform:uppercase;
  "
>
  Timeline
</div>

<div
  style="
    color:#f8fafc;
    font-size:17px;
    font-weight:800;
    margin-top:8px;
  "
>
  ${safeTimeline}
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

${messageSection}

${
  safeSummary
    ? `
<tr>

<td
  class="content-padding"
  style="padding:0 32px 16px;"
>

<div
  style="
    padding:15px 17px;
    border-left:3px solid #38bdf8;
    background:#0f172a;
    border-radius:10px;
    color:#94a3b8;
    font-size:11px;
    line-height:18px;
  "
>
  ${safeSummary}
</div>

</td>

</tr>
`
    : ""
}

${metadataSection}

<!-- ACTION BUTTONS -->

<tr>

<td
  class="content-padding"
  style="padding:8px 32px 32px;"
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
>

<tr>

<td align="center">

<div
  style="
    color:#64748b;
    font-size:10px;
    text-transform:uppercase;
    letter-spacing:1px;
    margin-bottom:13px;
  "
>
  Take action
</div>

<table
  cellpadding="0"
  cellspacing="0"
>

<tr>

${whatsappButton}

<td
  class="mobile-stack"
  style="padding-left:5px;"
>

<a
  href="${emailUrl}"
  class="mobile-button"
  style="
    display:inline-block;
    padding:13px 20px;
    background:#0284c7;
    border-radius:10px;
    color:#ffffff;
    font-size:12px;
    font-weight:800;
    text-decoration:none;
  "
>
  Reply by Email
</a>

</td>

</tr>

</table>

</td>

</tr>

</table>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
  style="
    padding:20px 28px;
    background:#080d1a;
    border-top:1px solid rgba(255,255,255,.07);
    text-align:center;
  "
>

<div
  style="
    color:#ffffff;
    font-size:12px;
    font-weight:750;
  "
>
  Abhishek Digital
</div>

<div
  style="
    color:#59657a;
    font-size:10px;
    line-height:17px;
    margin-top:6px;
  "
>
  Automated lead notification from your website
</div>

<div
  style="
    color:#3f4b5f;
    font-size:9px;
    margin-top:8px;
  "
>
  ${escapeHtml(TARGET_NOTIFICATION_EMAIL)}
</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>`;

  // ==========================================================
  // PLAIN TEXT VERSION
  // ==========================================================

  const text = [
    title,
    subtitle,
    "",
    `Received: ${timestamp}`,
    "",
    "CLIENT",
    `Name: ${senderName || "Website Visitor"}`,
    `Email: ${senderEmail || "Not provided"}`,
    `Phone / WhatsApp: ${
      senderPhone || "Not provided"
    }`,
    `Business: ${
      businessName || "Not specified"
    }`,
    `Country: ${country || "Not specified"}`,
    `Industry: ${niche || "Not specified"}`,
    "",
    "PROJECT",
    `Services: ${formatList(services)}`,
    `Platform: ${formatList(platforms)}`,
    `Goals: ${formatList(goals)}`,
    `Budget: ${budget || "Not specified"}`,
    `Timeline: ${timeline || "Not specified"}`,
    "",
    "CLIENT NOTES",
    message || "No additional notes provided.",
    "",
    summary
      ? `SUMMARY\n${summary}`
      : "",
    "",
    "Abhishek Digital",
    "Digital Products & AI Solutions",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    html,
    text,
  };
}

// ============================================================
// SMTP EMAIL SENDER
// ============================================================

async function sendNotificationEmail(params: {
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type: EmailType;
  summary: string;
  businessName?: string;
  country?: string;
  niche?: string;
  services?: string | string[];
  platforms?: string | string[];
  goals?: string | string[];
  budget?: string;
  timeline?: string;
  message?: string;
  metadata?: Record<string, any>;
}) {
  const {
    subject,
    senderName,
    senderEmail,
    senderPhone,
    type,
    summary,
    businessName,
    country,
    niche,
    services,
    platforms,
    goals,
    budget,
    timeline,
    message,
    metadata,
  } = params;

  if (!SMTP_USER) {
    throw new Error(
      "SMTP_USER is missing in environment variables."
    );
  }

  if (!SMTP_PASS) {
    throw new Error(
      "SMTP_PASS is missing. Use a Gmail App Password."
    );
  }

  if (!mailTransporter) {
    throw new Error(
      "SMTP transporter could not be initialized."
    );
  }

  const { html, text } =
    buildPremiumLeadEmail({
      type,
      senderName,
      senderEmail,
      senderPhone,
      businessName,
      country,
      niche,
      services,
      platforms,
      goals,
      budget,
      timeline,
      message,
      summary,
      metadata,
    });

  console.log("==============================================");
  console.log("📧 SENDING EMAIL");
  console.log("Provider: Gmail SMTP");
  console.log("To:", TARGET_NOTIFICATION_EMAIL);
  console.log("From:", EMAIL_FROM);
  console.log("Reply-To:", senderEmail);
  console.log("Subject:", subject);
  console.log("Type:", type);
  console.log(
    "Environment:",
    IS_VERCEL ? "Vercel" : "Local"
  );
  console.log("==============================================");

  const info = await mailTransporter.sendMail({
    from: EMAIL_FROM,
    to: TARGET_NOTIFICATION_EMAIL,
    replyTo: senderEmail,
    subject,
    html,
    text,
  });

  const messageId =
    info.messageId ||
    `mail-${Date.now()}`;

  const emailLog: EmailLogRecord = {
    id: messageId,
    sentAt: new Date().toISOString(),
    to: TARGET_NOTIFICATION_EMAIL,
    subject,
    senderName,
    senderEmail,
    senderPhone,
    type,
    summary,
    status: "sent",
    notes: `Accepted by Gmail SMTP. Message ID: ${messageId}`,
  };

  emailLogsStore.unshift(emailLog);

  // Keep latest 100 logs.
  emailLogsStore.splice(100);

  // Storage failure must NEVER break email delivery.
  try {
    saveEmailLogsToFile();
  } catch (error) {
    console.warn(
      "Could not save email log:",
      error
    );
  }

  console.log(
    "✅ Email accepted by Gmail SMTP:",
    messageId
  );

  return {
    success: true,
    emailLog,
    messageId,
  };
}

// ============================================================
// LEAD DATA
// ============================================================

const leadsStore: LeadRecord[] = [
  {
    id: "lead-101",
    createdAt: new Date(
      Date.now() - 3600000 * 24
    ).toISOString(),

    name: "Dr. Sarah Jenkins",

    businessName:
      "Coastal Smiles Dental",

    email:
      "sarah@coastalsmiles.example",

    phone:
      "+1 415-555-0182",

    country:
      "United States",

    businessNiche:
      "Dental Clinic",

    servicesRequired: [
      "Website",
      "Appointment Booking",
      "WhatsApp AI Bot",
      "Local SEO",
    ],

    platforms: [
      "Website",
      "Tablet",
    ],

    goals: [
      "Get Leads",
      "Book Appointments",
      "Automate Business",
    ],

    timeline:
      "2–4 weeks",

    budgetRange:
      "$2,500 – $5,000",

    projectDescription:
      "We want to revamp our dental practice website and install automated appointment reminders to stop patient no-shows.",

    status: "New",

    notes:
      "Requested a video walkthrough demo.",
  },

  {
    id: "lead-102",

    createdAt: new Date(
      Date.now() - 3600000 * 48
    ).toISOString(),

    name: "Vikram Mehta",

    businessName:
      "Spice Route Fine Dining",

    email:
      "vikram@spiceroute.example",

    phone:
      "+91 98200 12345",

    country:
      "India",

    businessNiche:
      "Restaurant",

    servicesRequired: [
      "Website",
      "Online Ordering",
      "QR Table Menu",
      "Google SEO",
    ],

    platforms: [
      "Website",
      "Android",
      "iOS",
    ],

    goals: [
      "Sell Products",
      "Book Appointments",
      "Build Brand",
    ],

    timeline:
      "ASAP",

    budgetRange:
      "₹1,50,000 – ₹3,00,000",

    projectDescription:
      "Want to stop paying 28% commissions to Swiggy/Zomato. Need our own direct delivery ordering platform.",

    status:
      "Proposal Sent",

    notes:
      "Sent Growth Package proposal.",
  },
];

// ============================================================
// LEAD FILE STORAGE
// ============================================================

function saveLeadsToFile(): void {
  // Do not write to the Vercel filesystem.
  if (IS_VERCEL) return;

  try {
    fs.writeFileSync(
      LEADS_FILE,
      JSON.stringify(leadsStore, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error(
      "Error saving leads:",
      error
    );
  }
}

function loadLeadsFromFile(): void {
  if (IS_VERCEL) return;

  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return;
    }

    const raw = fs.readFileSync(
      LEADS_FILE,
      "utf8"
    );

    const data = JSON.parse(raw);

    if (
      Array.isArray(data) &&
      data.length > 0
    ) {
      leadsStore.length = 0;
      leadsStore.push(...data);
    }
  } catch (error) {
    console.error(
      "Error loading leads:",
      error
    );
  }
}

loadLeadsFromFile();

// ============================================================
// ANALYTICS
// ============================================================

const analyticsStore = {
  pageViews: 1420,

  searchesCount: 680,

  topSearchedNiches: [
    {
      niche: "Dental Clinic",
      count: 184,
    },
    {
      niche: "Restaurant",
      count: 142,
    },
    {
      niche: "Real Estate Agency",
      count: 98,
    },
    {
      niche: "Gyms & Fitness",
      count: 76,
    },
    {
      niche: "General Contractor",
      count: 64,
    },
  ],

  quoteRequests: 18,

  whatsappClicks: 42,

  phoneClicks: 21,
};

// ============================================================
// HEALTH
// ============================================================

app.get(
  "/api/health",
  (_req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Abhishek Digital API is working",
      environment: IS_VERCEL
        ? "vercel"
        : "local",
      timestamp:
        new Date().toISOString(),
    });
  }
);

// ============================================================
// SMTP HEALTH CHECK
// ============================================================

app.get(
  "/api/email-status",
  async (_req, res) => {
    const configured =
      Boolean(
        SMTP_USER &&
        SMTP_PASS &&
        mailTransporter
      );

    let smtpConnection = "not_checked";

    if (configured) {
      try {
        await mailTransporter!.verify();

        smtpConnection = "connected";
      } catch (error: any) {
        console.error(
          "SMTP verification failed:",
          error
        );

        smtpConnection =
          "failed";
      }
    }

    const recentLog =
      emailLogsStore[0] || null;

    return res.json({
      success: true,

      environment:
        IS_VERCEL
          ? "vercel"
          : "local",

      provider:
        "gmail-smtp",

      targetEmail:
        TARGET_NOTIFICATION_EMAIL,

      smtpConfigured:
        configured,

      smtpConnection,

      smtpHost:
        SMTP_HOST,

      smtpPort:
        SMTP_PORT,

      emailFrom:
        EMAIL_FROM,

      totalDispatched:
        emailLogsStore.length,

      recentStatus:
        recentLog
          ? recentLog.status
          : "ready",

      recentNotes:
        recentLog
          ? recentLog.notes
          : "Ready to send email notifications through Gmail SMTP.",
    });
  }
);

// ============================================================
// AI CONSULTANT
// ============================================================

app.post(
  "/api/ai/consultant",
  async (req, res) => {
    try {
      const {
        businessType,
        description,
        targetGoals,
        budget,
      } = req.body;

      if (!businessType) {
        return res.status(400).json({
          success: false,
          error:
            "Business type or description is required.",
        });
      }

      // ======================================================
      // TRY GEMINI DYNAMICALLY
      // ======================================================
      //
      // Dynamic import means a problem with the Gemini SDK
      // cannot crash /api/health or /api/leads during startup.
      //
      // ======================================================

      const apiKey =
        process.env.GEMINI_API_KEY;

      if (
        apiKey &&
        apiKey !== "MY_GEMINI_API_KEY"
      ) {
        try {
          const { GoogleGenAI } =
            await import("@google/genai");

          const ai =
            new GoogleGenAI({
              apiKey,
            });

          const prompt = `
You are Abhishek's AI Digital Growth Consultant for businesses worldwide.

Business Type/Niche:
${String(businessType)}

Business Context:
${String(
  description || "None provided"
)}

Target Goals:
${String(
  targetGoals ||
    "Customer acquisition and modern digital presence"
)}

Budget:
${String(
  budget || "Standard commercial"
)}

Return ONLY valid JSON using exactly this structure:

{
  "nicheSummary": "1-2 sentence executive assessment.",
  "recommendedWebsite": "Key website/web app features.",
  "recommendedMobile": "Mobile or PWA recommendation.",
  "recommendedAI": "Practical AI automation.",
  "recommendedMarketing": "SEO, Google Ads and social strategy.",
  "quickWin": "One immediate action.",
  "recommendedServices": ["Service 1", "Service 2", "Service 3", "Service 4"],
  "estimatedTimeline": "2-4 weeks"
}
`;

          const model =
            process.env.GEMINI_MODEL ||
            "gemini-2.5-flash";

          const response =
            await ai.models.generateContent({
              model,
              contents: prompt,
              config: {
                responseMimeType:
                  "application/json",
              },
            });

          const rawText =
            response.text || "";

          if (rawText.trim()) {
            const parsed =
              JSON.parse(
                rawText.trim()
              );

            return res.json({
              success: true,
              plan: parsed,
              provider: model,
            });
          }
        } catch (geminiError) {
          console.error(
            "Gemini failed. Using fallback engine:",
            geminiError
          );
        }
      }

      // ======================================================
      // INTELLIGENT FALLBACK
      // ======================================================

      const cleanType =
        String(
          businessType
        ).toLowerCase();

      let nicheSummary =
        `For ${businessType}, modern digital trust and automated client booking represent the highest-leverage growth opportunities.`;

      let recommendedWebsite =
        "Ultra-fast responsive website with a high-converting showcase gallery, customer reviews, clear service breakdown, and strong contact CTAs.";

      let recommendedMobile =
        "Mobile-first Progressive Web App with push notifications and thumb-friendly contact, booking, and WhatsApp actions.";

      let recommendedAI =
        "24/7 WhatsApp AI customer support assistant trained on FAQs, operating hours, services, and common customer questions.";

      let recommendedMarketing =
        "Google Business Profile optimization, localized SEO, Google Search Ads, customer review generation, and social content.";

      let quickWin =
        "Implement a one-click WhatsApp booking CTA on the main website page to capture visitors immediately.";

      let recommendedServices = [
        "High-Speed Business Website",
        "Online Booking / Order System",
        "24/7 WhatsApp AI Assistant",
        "Local SEO Growth",
      ];

      if (
        cleanType.includes("dental") ||
        cleanType.includes("doctor") ||
        cleanType.includes("clinic")
      ) {
        nicheSummary =
          "Dental and healthcare practices can grow faster by combining strong trust signals, online appointment booking, automated reminders, and local search visibility.";

        recommendedWebsite =
          "Interactive treatment pages, before-and-after gallery, doctor profiles, testimonials, FAQ sections, and online appointment scheduling.";

        recommendedAI =
          "WhatsApp appointment assistant with confirmations, reminders, FAQ handling, and review collection.";

        recommendedMarketing =
          'Dominate local searches such as "best dentist near me" through Google Maps optimization, reviews, local SEO, and high-intent Search Ads.';

        recommendedServices = [
          "Interactive Clinic Website",
          "Online Appointment Booking",
          "WhatsApp AI Patient Assistant",
          "Local SEO & Reviews Engine",
        ];
      } else if (
        cleanType.includes("restaurant") ||
        cleanType.includes("food") ||
        cleanType.includes("cafe")
      ) {
        nicheSummary =
          "Restaurants can improve margins by replacing aggregator dependence with direct ordering, QR menus, reservations, customer retention, and local discovery.";

        recommendedWebsite =
          "Visual digital menu, direct ordering, table reservations, QR menu experience, offers, location, reviews, and mobile-first checkout.";

        recommendedAI =
          "WhatsApp order updates, customer FAQ automation, reservation assistant, and promotional campaigns.";

        recommendedMarketing =
          "Google Maps optimization, local SEO, Instagram content, food photography, customer reviews, and location-based campaigns.";

        recommendedServices = [
          "Digital Menu & Direct Ordering",
          "Table Reservation Engine",
          "QR Code Dine-In System",
          "Google Business Optimization",
        ];
      } else if (
        cleanType.includes("real estate") ||
        cleanType.includes("realtor") ||
        cleanType.includes("property")
      ) {
        nicheSummary =
          "Real estate businesses benefit from high-quality property discovery experiences combined with automated lead qualification and localized advertising.";

        recommendedWebsite =
          "Interactive property search, maps, advanced filters, property galleries, virtual tours, inquiry forms, and mortgage calculators.";

        recommendedAI =
          "AI buyer qualification assistant that collects budget, location, property type, timeline, and contact details before forwarding qualified leads.";

        recommendedMarketing =
          "Geo-targeted Google Ads, local SEO, property-specific landing pages, remarketing, and high-intent search campaigns.";

        recommendedServices = [
          "Property Discovery Portal",
          "Interactive Map & Search",
          "AI Lead Qualification",
          "Mortgage Calculator",
        ];
      }

      return res.json({
        success: true,

        plan: {
          nicheSummary,
          recommendedWebsite,
          recommendedMobile,
          recommendedAI,
          recommendedMarketing,
          quickWin,
          recommendedServices,
          estimatedTimeline:
            "2–4 weeks",
        },

        provider:
          "intelligent-engine",
      });
    } catch (error) {
      console.error(
        "AI Consultant error:",
        error
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to generate digital roadmap.",
      });
    }
  }
);

// ============================================================
// GET LEADS
// ============================================================

app.get(
  "/api/leads",
  (_req, res) => {
    return res.json({
      success: true,
      leads: leadsStore,
    });
  }
);

// ============================================================
// CREATE LEAD
// ============================================================

app.post(
  "/api/leads",
  async (req, res) => {
    try {
      const {
        name,
        businessName,
        email,
        phone,
        country,
        businessNiche,
        servicesRequired,
        platforms,
        goals,
        timeline,
        budgetRange,
        projectDescription,
      } = req.body;

      // ------------------------------------------------------
      // VALIDATION
      // ------------------------------------------------------

      if (!name || !email || !phone) {
        return res.status(400).json({
          success: false,
          error:
            "Name, email, and phone number are required.",
        });
      }

      // ------------------------------------------------------
      // CREATE LEAD
      // ------------------------------------------------------

      const newLead: LeadRecord = {
        id: `lead-${Date.now()}`,

        createdAt:
          new Date().toISOString(),

        name:
          String(name).trim(),

        businessName:
          String(
            businessName || ""
          ).trim(),

        email:
          String(email).trim(),

        phone:
          String(phone).trim(),

        country:
          String(
            country || "Not specified"
          ).trim(),

        businessNiche:
          String(
            businessNiche ||
              "General Business"
          ).trim(),

        servicesRequired:
          Array.isArray(
            servicesRequired
          )
            ? servicesRequired.map(
                String
              )
            : [],

        platforms:
          Array.isArray(platforms)
            ? platforms.map(String)
            : ["Website"],

        goals:
          Array.isArray(goals)
            ? goals.map(String)
            : ["Get Leads"],

        timeline:
          String(
            timeline || "Flexible"
          ).trim(),

        budgetRange:
          String(
            budgetRange || "Flexible"
          ).trim(),

        projectDescription:
          String(
            projectDescription || ""
          ).trim(),

        status: "New",
      };

      leadsStore.unshift(
        newLead
      );

      analyticsStore.quoteRequests +=
        1;

      // Save locally only.
      saveLeadsToFile();

      // ------------------------------------------------------
      // EMAIL DATA
      // ------------------------------------------------------

      const servicesList =
        newLead.servicesRequired.join(
          ", "
        ) || "Not specified";

      const platformsList =
        newLead.platforms.join(
          ", "
        ) || "Website";

      const goalsList =
        newLead.goals.join(
          ", "
        ) || "Business Growth";

      const emailSubject =
        `🚀 Project Roadmap Received! [${newLead.businessNiche}] from ${newLead.name}`;

      // ------------------------------------------------------
      // SEND EMAIL
      // ------------------------------------------------------

      const emailResult =
        await sendNotificationEmail({
          subject:
            emailSubject,

          senderName:
            newLead.name,

          senderEmail:
            newLead.email,

          senderPhone:
            newLead.phone,

          type:
            "project_roadmap",

          businessName:
            newLead.businessName,

          country:
            newLead.country,

          niche:
            newLead.businessNiche,

          services:
            servicesList,

          platforms:
            platformsList,

          goals:
            goalsList,

          budget:
            newLead.budgetRange,

          timeline:
            newLead.timeline,

          message:
            newLead.projectDescription,

          summary:
            `${newLead.businessNiche} roadmap submitted with budget ${newLead.budgetRange}`,

          metadata: {
            leadId:
              newLead.id,

            submissionType:
              "Project Roadmap",

            source:
              "Abhishek Digital Website",
          },
        });

      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------

      return res.status(201).json({
        success: true,

        message:
          "Project roadmap received and email notification sent.",

        leadId:
          newLead.id,

        notificationSentTo:
          TARGET_NOTIFICATION_EMAIL,

        emailLogId:
          emailResult.emailLog.id,

        emailId:
          emailResult.messageId,

        deliveryStatus:
          emailResult.emailLog.status,
      });
    } catch (err) {
      console.error(
        "❌ Lead creation/email error:",
        err
      );

      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Failed to create lead and send email.";

      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  }
);

// ============================================================
// SEND EMAIL
// ============================================================

app.post(
  "/api/send-email",
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        subject,
        message,
        formType,
        metadata,
        businessName,
        country,
        niche,
        services,
        platforms,
        goals,
        budget,
        timeline,
      } = req.body;

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error:
            "Name and email are required.",
        });
      }

      const allowedTypes: EmailType[] =
        [
          "project_roadmap",
          "contact_form",
          "ai_blueprint",
          "score_audit",
        ];

      const normalizedType: EmailType =
        allowedTypes.includes(
          formType
        )
          ? formType
          : "contact_form";

      const emailSubject =
        subject ||
        `📩 New Client Inquiry from ${name}`;

      const result =
        await sendNotificationEmail({
          subject:
            emailSubject,

          senderName:
            String(name).trim(),

          senderEmail:
            String(email).trim(),

          senderPhone:
            String(
              phone || ""
            ).trim(),

          type:
            normalizedType,

          businessName:
            businessName ||
            metadata?.businessName,

          country:
            country ||
            metadata?.country,

          niche:
            niche ||
            metadata?.niche ||
            formType ||
            "Website Inquiry",

          services:
            services ||
            metadata?.services,

          platforms:
            platforms ||
            metadata?.platforms,

          goals:
            goals ||
            metadata?.goals,

          budget:
            budget ||
            metadata?.budget,

          timeline:
            timeline ||
            metadata?.timeline,

          message:
            message ||
            metadata?.message,

          summary:
            message
              ? String(
                  message
                ).slice(0, 160)
              : `${normalizedType} form submission`,

          metadata: {
            ...(metadata || {}),

            submissionType:
              normalizedType,

            source:
              "Abhishek Digital Website",
          },
        });

      return res.status(200).json({
        success: true,

        message:
          "Form submitted and email notification sent.",

        notificationSentTo:
          TARGET_NOTIFICATION_EMAIL,

        emailLogId:
          result.emailLog.id,

        emailId:
          result.messageId,

        deliveryStatus:
          result.emailLog.status,
      });
    } catch (err) {
      console.error(
        "❌ Send-email error:",
        err
      );

      return res.status(500).json({
        success: false,

        error:
          err instanceof Error
            ? err.message
            : "Failed to send email notification.",
      });
    }
  }
);

// ============================================================
// TEST EMAIL
// ============================================================

app.post(
  "/api/send-test-email",
  async (_req, res) => {
    try {
      const result =
        await sendNotificationEmail({
          subject:
            "🧪 Abhishek Digital — Email System Test",

          senderName:
            "Abhishek Digital Test",

          senderEmail:
            TARGET_NOTIFICATION_EMAIL,

          senderPhone:
            "",

          type:
            "contact_form",

          businessName:
            "Email System",

          country:
            "India",

          niche:
            "System Verification",

          services:
            "Email Notification System",

          platforms:
            "Website",

          goals:
            "Verify production email delivery",

          budget:
            "N/A",

          timeline:
            "Immediate",

          message:
            "This is a test email from the Abhishek Digital website. If you received this message, Gmail SMTP production email delivery is working correctly.",

          summary:
            "Production SMTP email system verification.",

          metadata: {
            test: true,

            source:
              "Abhishek Digital Website",
          },
        });

      return res.status(200).json({
        success: true,

        message:
          "Test email sent successfully through Gmail SMTP.",

        targetEmail:
          TARGET_NOTIFICATION_EMAIL,

        emailId:
          result.messageId,

        log:
          result.emailLog,
      });
    } catch (err: any) {
      console.error(
        "❌ Test email error:",
        err
      );

      return res.status(500).json({
        success: false,

        error:
          err?.message ||
          "Failed to send test email.",
      });
    }
  }
);

// ============================================================
// EMAIL LOGS
// ============================================================

app.get(
  "/api/email-logs",
  (_req, res) => {
    return res.json({
      success: true,

      targetEmail:
        TARGET_NOTIFICATION_EMAIL,

      totalLogs:
        emailLogsStore.length,

      logs:
        emailLogsStore,
    });
  }
);

// ============================================================
// CSV EXPORT
// ============================================================

app.get(
  "/api/export-leads",
  (_req, res) => {
    try {
      const headers = [
        "ID",
        "Date",
        "Name",
        "Business",
        "Email",
        "Phone",
        "Country",
        "Niche",
        "Services",
        "Budget",
        "Timeline",
        "Status",
        "Description",
      ];

      const rows =
        leadsStore.map(
          (lead) => [
            lead.id,

            `"${lead.createdAt}"`,

            `"${(
              lead.name || ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.businessName ||
              ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.email || ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.phone || ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.country || ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.businessNiche ||
              ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.servicesRequired.join(
                "; "
              ) || ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.budgetRange ||
              ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${(
              lead.timeline ||
              ""
            ).replace(
              /"/g,
              '""'
            )}"`,

            `"${lead.status}"`,

            `"${(
              lead.projectDescription ||
              ""
            ).replace(
              /"/g,
              '""'
            )}"`,
          ]
        );

      const csvContent = [
        headers.join(","),
        ...rows.map(
          (row) =>
            row.join(",")
        ),
      ].join("\n");

      res.setHeader(
        "Content-Type",
        "text/csv; charset=utf-8"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="leads-abhishek-${Date.now()}.csv"`
      );

      return res.send(
        csvContent
      );
    } catch (err) {
      console.error(
        "CSV export error:",
        err
      );

      return res.status(500).json({
        success: false,
        error:
          "Failed to export leads.",
      });
    }
  }
);

// ============================================================
// UPDATE LEAD
// ============================================================

app.patch(
  "/api/leads/:id",
  (req, res) => {
    const { id } =
      req.params;

    const {
      status,
      notes,
    } = req.body;

    const lead =
      leadsStore.find(
        (item) =>
          item.id === id
      );

    if (!lead) {
      return res.status(404).json({
        success: false,
        error:
          "Lead not found.",
      });
    }

    if (status) {
      const validStatuses: LeadStatus[] =
        [
          "New",
          "Contacted",
          "Proposal Sent",
          "In Discussion",
          "Won",
          "Lost",
        ];

      if (
        validStatuses.includes(
          status
        )
      ) {
        lead.status = status;
      }
    }

    if (
      notes !== undefined
    ) {
      lead.notes = String(
        notes
      );
    }

    saveLeadsToFile();

    return res.json({
      success: true,
      lead,
    });
  }
);

// ============================================================
// ANALYTICS GET
// ============================================================

app.get(
  "/api/analytics",
  (_req, res) => {
    return res.json({
      success: true,
      analytics:
        analyticsStore,
    });
  }
);

// ============================================================
// ANALYTICS EVENT
// ============================================================

app.post(
  "/api/analytics/event",
  (req, res) => {
    const {
      type,
      payload,
    } = req.body;

    if (
      type === "page_view"
    ) {
      analyticsStore.pageViews += 1;
    }

    else if (
      type === "search" &&
      payload?.niche
    ) {
      analyticsStore.searchesCount +=
        1;

      const existing =
        analyticsStore.topSearchedNiches.find(
          (item) =>
            item.niche
              .toLowerCase() ===
            String(
              payload.niche
            ).toLowerCase()
        );

      if (existing) {
        existing.count += 1;
      } else {
        analyticsStore.topSearchedNiches.push(
          {
            niche: String(
              payload.niche
            ),
            count: 1,
          }
        );
      }
    }

    else if (
      type ===
      "whatsapp_click"
    ) {
      analyticsStore.whatsappClicks +=
        1;
    }

    else if (
      type ===
      "phone_click"
    ) {
      analyticsStore.phoneClicks +=
        1;
    }

    return res.json({
      success: true,
    });
  }
);

// ============================================================
// LOCAL FRONTEND
// ============================================================
//
// This section runs ONLY locally.
// Vercel uses api/[...path].ts to invoke Express.
// ============================================================

if (!IS_VERCEL) {
  const distPath =
    path.join(
      __dirname,
      "dist"
    );

  app.use(
    express.static(
      distPath
    )
  );

  // Regex avoids Express wildcard route compatibility issues.
  app.get(
    /.*/,
    (req, res) => {
      // Never replace API errors with index.html.
      if (
        req.path.startsWith(
          "/api/"
        )
      ) {
        return res.status(404).json({
          success: false,
          error:
            "API endpoint not found.",
        });
      }

      return res.sendFile(
        path.join(
          distPath,
          "index.html"
        )
      );
    }
  );

  const PORT =
    Number(
      process.env.PORT
    ) || 3000;

  app.listen(
    PORT,
    () => {
      console.log(
        `🚀 Abhishek Digital running at http://localhost:${PORT}`
      );

      console.log(
        "📧 Email provider: Gmail SMTP"
      );

      console.log(
        "📨 Notification email:",
        TARGET_NOTIFICATION_EMAIL
      );
    }
  );
}

// ============================================================
// VERCEL EXPORT
// ============================================================

export default app;