import express from "express";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json({ limit: "1mb" }));

/* =========================================================
   CONFIG
========================================================= */

export const TARGET_NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "abhishekkuntare02@gmail.com";

/* =========================================================
   TYPES
========================================================= */

interface EmailLogRecord {
  id: string;
  sentAt: string;
  to: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type:
    | "project_roadmap"
    | "contact_form"
    | "ai_blueprint"
    | "score_audit";
  summary: string;
  status:
    | "sent"
    | "delivered"
    | "logged"
    | "pending_activation"
    | "failed";
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
  status:
    | "New"
    | "Contacted"
    | "Proposal Sent"
    | "In Discussion"
    | "Won"
    | "Lost";
  notes?: string;
}

/* =========================================================
   IN-MEMORY STORES
   IMPORTANT:
   Vercel serverless functions do NOT provide permanent
   filesystem storage.
========================================================= */

const emailLogsStore: EmailLogRecord[] = [];

const leadsStore: LeadRecord[] = [
  {
    id: "lead-101",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    name: "Dr. Sarah Jenkins",
    businessName: "Coastal Smiles Dental",
    email: "sarah@coastalsmiles.example",
    phone: "+1 415-555-0182",
    country: "United States",
    businessNiche: "Dental Clinic",
    servicesRequired: [
      "Website",
      "Appointment Booking",
      "WhatsApp AI Bot",
      "Local SEO",
    ],
    platforms: ["Website", "Tablet"],
    goals: ["Get Leads", "Book Appointments", "Automate Business"],
    timeline: "2–4 weeks",
    budgetRange: "$2,500 – $5,000",
    projectDescription:
      "We want to revamp our dental practice website and install automated appointment reminders.",
    status: "New",
    notes: "Requested a video walkthrough demo.",
  },

  {
    id: "lead-102",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    name: "Vikram Mehta",
    businessName: "Spice Route Fine Dining",
    email: "vikram@spiceroute.example",
    phone: "+91 98200 12345",
    country: "India",
    businessNiche: "Restaurant",
    servicesRequired: [
      "Website",
      "Online Ordering",
      "QR Table Menu",
      "Google SEO",
    ],
    platforms: ["Website", "Android", "iOS"],
    goals: ["Sell Products", "Book Appointments", "Build Brand"],
    timeline: "ASAP",
    budgetRange: "₹1,50,000 – ₹3,00,000",
    projectDescription:
      "Want to stop paying high third-party commissions and build our own direct ordering platform.",
    status: "Proposal Sent",
    notes: "Sent Growth Package proposal.",
  },
];

const analyticsStore = {
  pageViews: 1420,
  searchesCount: 680,

  topSearchedNiches: [
    { niche: "Dental Clinic", count: 184 },
    { niche: "Restaurant", count: 142 },
    { niche: "Real Estate Agency", count: 98 },
    { niche: "Gyms & Fitness", count: 76 },
    { niche: "General Contractor", count: 64 },
  ],

  quoteRequests: 18,
  whatsappClicks: 42,
  phoneClicks: 21,
};

/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanPhone(phone: string): string {
  return String(phone || "").replace(/\D/g, "");
}

function createWhatsAppUrl(phone: string, message: string): string {
  const clean = cleanPhone(phone);

  if (!clean) {
    return "https://wa.me/";
  }

  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/* =========================================================
   EMAIL DISPATCHER
   SMTP PRIMARY
   FORMSUBMIT FALLBACK
========================================================= */

async function sendNotificationEmail(params: {
  subject: string;
  htmlContent: string;
  textContent: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type:
    | "project_roadmap"
    | "contact_form"
    | "ai_blueprint"
    | "score_audit";
  summary: string;
}) {
  const {
    subject,
    htmlContent,
    textContent,
    senderName,
    senderEmail,
    senderPhone,
    type,
    summary,
  } = params;

  const logId = `mail-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  console.log("============================================");
  console.log("EMAIL DISPATCH");
  console.log("To:", TARGET_NOTIFICATION_EMAIL);
  console.log("Subject:", subject);
  console.log("From:", senderName, senderEmail);
  console.log("============================================");

  /*
   * ======================================================
   * METHOD 1 — SMTP / NODEMAILER
   * ======================================================
   */

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const smtpPort = Number(process.env.SMTP_PORT || 587);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: smtpPort,
        secure: smtpPort === 465,

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.verify();

      await transporter.sendMail({
        from: `"Abhishek Digital Website" <${process.env.SMTP_USER}>`,

        to: TARGET_NOTIFICATION_EMAIL,

        replyTo: senderEmail,

        subject,

        text: textContent,

        html: htmlContent,
      });

      const emailLog: EmailLogRecord = {
        id: logId,
        sentAt: new Date().toISOString(),
        to: TARGET_NOTIFICATION_EMAIL,
        subject,
        senderName,
        senderEmail,
        senderPhone,
        type,
        summary,
        status: "sent",
        notes: "Successfully sent using SMTP/Nodemailer.",
      };

      emailLogsStore.unshift(emailLog);

      console.log("✅ SMTP EMAIL SENT");

      return {
        emailLog,
        formSubmitMessage: null,
      };
    } catch (smtpError: any) {
      console.error(
        "❌ SMTP failed:",
        smtpError?.message || smtpError
      );
    }
  }

  /*
   * ======================================================
   * METHOD 2 — FORMSUBMIT FALLBACK
   * ======================================================
   */

  try {
    const endpoint =
      `https://formsubmit.co/ajax/${TARGET_NOTIFICATION_EMAIL}`;

    const formSubmitResponse = await fetch(endpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        _subject: `🔥 [Abhishek Digital] ${subject}`,
        _replyto: senderEmail,
        _template: "table",
        _captcha: "false",

        name: senderName,
        email: senderEmail,
        phone: senderPhone,

        "Submission Type": type,
        Summary: summary,
        "Detailed Specifications": textContent,

        timestamp: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
      }),
    });

    const rawResponse = await formSubmitResponse.text();

    console.log("FormSubmit HTTP:", formSubmitResponse.status);
    console.log("FormSubmit RAW:", rawResponse);

    let formSubmitData: any = null;

    try {
      formSubmitData = JSON.parse(rawResponse);
    } catch {
      formSubmitData = null;
    }

    if (
      formSubmitResponse.ok &&
      (
        formSubmitData?.success === true ||
        formSubmitData?.success === "true"
      )
    ) {
      const emailLog: EmailLogRecord = {
        id: logId,
        sentAt: new Date().toISOString(),
        to: TARGET_NOTIFICATION_EMAIL,
        subject,
        senderName,
        senderEmail,
        senderPhone,
        type,
        summary,
        status: "sent",
        notes: "Successfully sent using FormSubmit.",
      };

      emailLogsStore.unshift(emailLog);

      console.log("✅ FORMSUBMIT EMAIL SENT");

      return {
        emailLog,
        formSubmitMessage: formSubmitData?.message || null,
      };
    }

    const message =
      formSubmitData?.message ||
      rawResponse ||
      "FormSubmit did not return a successful response.";

    const pendingActivation =
      message.toLowerCase().includes("activation");

    const emailLog: EmailLogRecord = {
      id: logId,
      sentAt: new Date().toISOString(),
      to: TARGET_NOTIFICATION_EMAIL,
      subject,
      senderName,
      senderEmail,
      senderPhone,
      type,
      summary,
      status: pendingActivation
        ? "pending_activation"
        : "failed",
      notes: message.substring(0, 500),
    };

    emailLogsStore.unshift(emailLog);

    console.error("❌ FormSubmit failed:", message);

    return {
      emailLog,
      formSubmitMessage: message,
    };
  } catch (error: any) {
    console.error(
      "❌ FormSubmit request failed:",
      error?.message || error
    );

    const emailLog: EmailLogRecord = {
      id: logId,
      sentAt: new Date().toISOString(),
      to: TARGET_NOTIFICATION_EMAIL,
      subject,
      senderName,
      senderEmail,
      senderPhone,
      type,
      summary,
      status: "failed",
      notes: error?.message || "Unknown email error.",
    };

    emailLogsStore.unshift(emailLog);

    return {
      emailLog,
      formSubmitMessage:
        error?.message || "Email dispatch failed.",
    };
  }
}

/* =========================================================
   HEALTH
========================================================= */

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    service: "Abhishek Digital API",
    time: new Date().toISOString(),
  });
});

/* =========================================================
   AI CONSULTANT
========================================================= */

app.post("/api/ai/consultant", async (req, res) => {
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
        error: "Business type is required.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({
          apiKey,
        });

        const prompt = `
You are Abhishek's AI Digital Growth Consultant.

Business Type:
${businessType}

Business Details:
${description || "None provided"}

Goals:
${targetGoals || "Customer acquisition and digital growth"}

Budget:
${budget || "Standard commercial"}

Return strict JSON:

{
  "nicheSummary": "",
  "recommendedWebsite": "",
  "recommendedMobile": "",
  "recommendedAI": "",
  "recommendedMarketing": "",
  "quickWin": "",
  "recommendedServices": [],
  "estimatedTimeline": ""
}
`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",

          contents: prompt,

          config: {
            responseMimeType: "application/json",
          },
        });

        const rawText = response.text || "";

        const parsed = JSON.parse(rawText.trim());

        return res.json({
          success: true,
          plan: parsed,
          provider: "gemini",
        });
      } catch (error) {
        console.error("Gemini failed:", error);
      }
    }

    /*
     * FALLBACK ENGINE
     */

    const cleanType = String(businessType).toLowerCase();

    let nicheSummary =
      `For ${businessType}, modern digital trust and automated client booking represent major growth opportunities.`;

    let recommendedWebsite =
      "Fast responsive website with service pages, testimonials, gallery and strong conversion-focused CTAs.";

    let recommendedMobile =
      "Mobile-first PWA experience with quick contact and booking actions.";

    let recommendedAI =
      "24/7 WhatsApp AI assistant for FAQs, lead capture and customer support.";

    let recommendedMarketing =
      "Google Business Profile optimization, local SEO and high-intent search campaigns.";

    let quickWin =
      "Add a one-click WhatsApp CTA to capture visitors immediately.";

    let recommendedServices = [
      "High-Speed Business Website",
      "Online Booking / Order System",
      "24/7 WhatsApp AI Assistant",
      "Local SEO",
    ];

    if (
      cleanType.includes("dental") ||
      cleanType.includes("doctor") ||
      cleanType.includes("clinic")
    ) {
      nicheSummary =
        "Healthcare businesses can grow strongly through online appointment booking, local search visibility and automated follow-ups.";

      recommendedWebsite =
        "Professional clinic website with treatment pages, doctor profiles, reviews and appointment booking.";

      recommendedAI =
        "WhatsApp appointment confirmation, reminders and FAQ assistant.";

      recommendedMarketing =
        "Local SEO and Google Search campaigns targeting high-intent patients.";

      recommendedServices = [
        "Interactive Clinic Website",
        "Online Appointment Booking",
        "WhatsApp AI Assistant",
        "Local SEO & Reviews",
      ];
    }

    if (
      cleanType.includes("restaurant") ||
      cleanType.includes("food") ||
      cleanType.includes("cafe")
    ) {
      nicheSummary =
        "Restaurants can improve margins by increasing direct ordering, reservations and repeat customer engagement.";

      recommendedWebsite =
        "Digital menu, online ordering, table reservations and location integration.";

      recommendedAI =
        "WhatsApp order updates and automated promotional campaigns.";

      recommendedMarketing =
        "Google Maps optimization, local SEO and social media content.";

      recommendedServices = [
        "Digital Menu",
        "Direct Food Ordering",
        "Table Reservation System",
        "Google Business Optimization",
      ];
    }

    if (
      cleanType.includes("real estate") ||
      cleanType.includes("realtor") ||
      cleanType.includes("property")
    ) {
      nicheSummary =
        "Real estate businesses benefit from strong property discovery, lead qualification and automated follow-up.";

      recommendedWebsite =
        "Property listing portal with filters, maps, galleries and lead capture.";

      recommendedAI =
        "AI buyer qualification assistant for budget, location and timeline.";

      recommendedMarketing =
        "Geo-targeted Google Ads and local SEO.";

      recommendedServices = [
        "Property Discovery Portal",
        "Property Search",
        "AI Lead Qualification",
        "Real Estate Lead Automation",
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
        estimatedTimeline: "2–4 weeks",
      },

      provider: "intelligent-engine",
    });
  } catch (error) {
    console.error("AI Consultant error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to generate digital roadmap.",
    });
  }
});

/* =========================================================
   CREATE LEAD / PROJECT PROPOSAL
========================================================= */

app.post("/api/leads", async (req, res) => {
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

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Name, email and phone are required.",
      });
    }

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,

      createdAt: new Date().toISOString(),

      name: String(name).trim(),

      businessName: String(
        businessName || ""
      ).trim(),

      email: String(email).trim(),

      phone: String(phone).trim(),

      country: String(
        country || "Not specified"
      ).trim(),

      businessNiche: String(
        businessNiche || "General Business"
      ).trim(),

      servicesRequired: Array.isArray(servicesRequired)
        ? servicesRequired.map(String)
        : [],

      platforms: Array.isArray(platforms)
        ? platforms.map(String)
        : ["Website"],

      goals: Array.isArray(goals)
        ? goals.map(String)
        : ["Get Leads"],

      timeline: String(
        timeline || "Flexible"
      ).trim(),

      budgetRange: String(
        budgetRange || "Flexible"
      ).trim(),

      projectDescription: String(
        projectDescription || ""
      ).trim(),

      status: "New",
    };

    leadsStore.unshift(newLead);

    analyticsStore.quoteRequests += 1;

    const servicesList =
      newLead.servicesRequired.join(", ") ||
      "Not specified";

    const platformsList =
      newLead.platforms.join(", ") ||
      "Website";

    const goalsList =
      newLead.goals.join(", ") ||
      "Business Growth";

    const emailSubject =
      `🚀 Project Proposal — ${newLead.name}`;

    const whatsappUrl = createWhatsAppUrl(
      newLead.phone,

      `Hi ${newLead.name}, this is Abhishek from Abhishek Digital. I received your project proposal for ${
        newLead.businessName ||
        newLead.businessNiche
      }.`
    );

    const emailText = `
PROJECT PROPOSAL RECEIVED
=========================

CLIENT INFORMATION

Name:
${newLead.name}

Business:
${newLead.businessName || "Not specified"}

Email:
${newLead.email}

Phone / WhatsApp:
${newLead.phone}

Country:
${newLead.country}

Business Niche:
${newLead.businessNiche}


PROJECT REQUIREMENTS

Services:
${servicesList}

Platforms:
${platformsList}

Goals:
${goalsList}

Timeline:
${newLead.timeline}

Budget:
${newLead.budgetRange}


PROJECT DESCRIPTION

${newLead.projectDescription || "No additional notes provided."}


Submitted:
${new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
})}
`.trim();

    const emailHtml = `
<!DOCTYPE html>

<html>

<body style="margin:0;padding:0;background:#080b12;font-family:Arial,sans-serif;">

<div style="max-width:650px;margin:30px auto;padding:28px;background:#0c101c;border:1px solid #1e293b;border-radius:16px;color:#f8fafc;">

<h1 style="margin:0 0 8px;color:#38bdf8;">
🚀 New Project Proposal
</h1>

<p style="color:#94a3b8;">
A new project proposal was submitted through Abhishek Digital.
</p>

<hr style="border:0;border-top:1px solid #1e293b;margin:24px 0;">

<h2 style="color:#38bdf8;font-size:18px;">
👤 Client Information
</h2>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td style="padding:7px;color:#94a3b8;">Name</td>
<td style="padding:7px;font-weight:bold;">
${escapeHtml(newLead.name)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Business</td>
<td style="padding:7px;">
${escapeHtml(newLead.businessName || "Not specified")}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Email</td>

<td style="padding:7px;">
<a
href="mailto:${encodeURIComponent(newLead.email)}"
style="color:#38bdf8;"
>
${escapeHtml(newLead.email)}
</a>
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">
Phone / WhatsApp
</td>

<td style="padding:7px;">

<a
href="${whatsappUrl}"
style="color:#34d399;font-weight:bold;"
>
${escapeHtml(newLead.phone)}
</a>

</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">
Country
</td>

<td style="padding:7px;">
${escapeHtml(newLead.country)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">
Niche
</td>

<td style="padding:7px;color:#f59e0b;font-weight:bold;">
${escapeHtml(newLead.businessNiche)}
</td>
</tr>

</table>


<h2 style="color:#38bdf8;font-size:18px;margin-top:30px;">
🛠 Project Requirements
</h2>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td style="padding:7px;color:#94a3b8;">Services</td>
<td style="padding:7px;">
${escapeHtml(servicesList)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Platforms</td>
<td style="padding:7px;">
${escapeHtml(platformsList)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Goals</td>
<td style="padding:7px;">
${escapeHtml(goalsList)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Timeline</td>
<td style="padding:7px;">
${escapeHtml(newLead.timeline)}
</td>
</tr>

<tr>
<td style="padding:7px;color:#94a3b8;">Budget</td>
<td style="padding:7px;color:#34d399;font-weight:bold;">
${escapeHtml(newLead.budgetRange)}
</td>
</tr>

</table>


${
  newLead.projectDescription
    ? `
<h2 style="color:#38bdf8;font-size:18px;margin-top:30px;">
📝 Project Details
</h2>

<div style="background:#111827;padding:16px;border-radius:10px;color:#cbd5e1;line-height:1.6;white-space:pre-wrap;">
${escapeHtml(newLead.projectDescription)}
</div>
`
    : ""
}


<div style="text-align:center;margin-top:30px;">

<a
href="${whatsappUrl}"
style="
display:inline-block;
background:#10b981;
color:#ffffff;
padding:12px 22px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
"
>
Reply on WhatsApp
</a>

<a
href="mailto:${encodeURIComponent(
  newLead.email
)}?subject=${encodeURIComponent(
  "Project Proposal - Abhishek Digital"
)}"
style="
display:inline-block;
background:#0284c7;
color:#ffffff;
padding:12px 22px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
margin-left:8px;
"
>
Reply via Email
</a>

</div>

</div>

</body>

</html>
`;

    const result = await sendNotificationEmail({
      subject: emailSubject,
      htmlContent: emailHtml,
      textContent: emailText,

      senderName: newLead.name,

      senderEmail: newLead.email,

      senderPhone: newLead.phone,

      type: "project_roadmap",

      summary:
        `${newLead.businessNiche} proposal from ${newLead.name}`,
    });

    return res.status(201).json({
      success: true,

      message:
        "Project proposal received successfully.",

      leadId: newLead.id,

      notificationSentTo:
        TARGET_NOTIFICATION_EMAIL,

      emailLogId:
        result.emailLog.id,

      deliveryStatus:
        result.emailLog.status,

      needsActivation:
        result.emailLog.status ===
        "pending_activation",

      activationNotice:
        result.formSubmitMessage || null,
    });
  } catch (error) {
    console.error("Lead creation error:", error);

    return res.status(500).json({
      success: false,
      error: "Could not submit proposal request.",
    });
  }
});

/* =========================================================
   GET LEADS
========================================================= */

app.get("/api/leads", (_req, res) => {
  res.json({
    success: true,
    leads: leadsStore,
  });
});

/* =========================================================
   SEND EMAIL
========================================================= */

app.post("/api/send-email", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      formType,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required.",
      });
    }

    const emailSubject =
      subject ||
      `📩 New Inquiry — ${name}`;

    const textContent = `
NEW FORM SUBMISSION

Name:
${name}

Email:
${email}

Phone:
${phone || "Not provided"}

Form Type:
${formType || "Website Form"}

Message:

${message || "No message provided."}
`.trim();

    const htmlContent = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#0c101c;color:#f8fafc;padding:25px;border-radius:14px;">

<h2 style="color:#38bdf8;">
📩 New Website Inquiry
</h2>

<p>
<strong>Name:</strong>
${escapeHtml(name)}
</p>

<p>
<strong>Email:</strong>
${escapeHtml(email)}
</p>

<p>
<strong>Phone:</strong>
${escapeHtml(phone || "Not provided")}
</p>

<p>
<strong>Form:</strong>
${escapeHtml(formType || "Website Form")}
</p>

<hr style="border:0;border-top:1px solid #1e293b;">

<div style="white-space:pre-wrap;color:#cbd5e1;">
${escapeHtml(message || "No message provided.")}
</div>

<br>

<a
href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
  `Re: ${emailSubject}`
)}"
style="background:#0284c7;color:#fff;padding:10px 18px;border-radius:7px;text-decoration:none;"
>
Reply to ${escapeHtml(name)}
</a>

</div>
`;

    const result = await sendNotificationEmail({
      subject: emailSubject,

      htmlContent,

      textContent,

      senderName: name,

      senderEmail: email,

      senderPhone: phone || "N/A",

      type:
        formType === "ai_blueprint"
          ? "ai_blueprint"
          : formType === "score_audit"
          ? "score_audit"
          : "contact_form",

      summary:
        message?.slice(0, 150) ||
        `${formType || "Website"} submission`,
    });

    return res.json({
      success: true,

      message:
        "Form received successfully.",

      notificationSentTo:
        TARGET_NOTIFICATION_EMAIL,

      emailLogId:
        result.emailLog.id,

      deliveryStatus:
        result.emailLog.status,
    });
  } catch (error) {
    console.error("Send email error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to process email.",
    });
  }
});

/* =========================================================
   TEST EMAIL
========================================================= */

app.post("/api/send-test-email", async (_req, res) => {
  try {
    const result = await sendNotificationEmail({
      subject:
        "🧪 Abhishek Digital — Test Email",

      htmlContent: `
<div style="font-family:Arial,sans-serif;padding:25px;">

<h2>
🧪 Email System Test
</h2>

<p>
Hello Abhishek 👋
</p>

<p>
Your Abhishek Digital email notification system is working.
</p>

<p>
Target:
<strong>
${escapeHtml(TARGET_NOTIFICATION_EMAIL)}
</strong>
</p>

</div>
`,

      textContent: `
Abhishek Digital Email System Test

Hello Abhishek,

Your email notification system is working.

Target:
${TARGET_NOTIFICATION_EMAIL}
`.trim(),

      senderName:
        "Abhishek Digital System",

      senderEmail:
        process.env.SMTP_USER ||
        "website@abhishek-digital.app",

      senderPhone:
        "+91 9156075536",

      type: "contact_form",

      summary:
        "Email system verification",
    });

    return res.json({
      success: true,

      message:
        "Test email processed.",

      targetEmail:
        TARGET_NOTIFICATION_EMAIL,

      deliveryStatus:
        result.emailLog.status,

      log:
        result.emailLog,
    });
  } catch (error: any) {
    console.error("Test email error:", error);

    return res.status(500).json({
      success: false,
      error:
        error?.message ||
        "Failed to send test email.",
    });
  }
});

/* =========================================================
   EMAIL LOGS
========================================================= */

app.get("/api/email-logs", (_req, res) => {
  res.json({
    success: true,

    targetEmail:
      TARGET_NOTIFICATION_EMAIL,

    totalLogs:
      emailLogsStore.length,

    logs:
      emailLogsStore,
  });
});

/* =========================================================
   EMAIL STATUS
========================================================= */

app.get("/api/email-status", (_req, res) => {
  const smtpConfigured = Boolean(
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );

  const latest =
    emailLogsStore[0] || null;

  res.json({
    success: true,

    targetEmail:
      TARGET_NOTIFICATION_EMAIL,

    smtpConfigured,

    formSubmitFallback: true,

    totalDispatched:
      emailLogsStore.length,

    recentStatus:
      latest?.status || "ready",

    recentNotes:
      latest?.notes ||
      "Email system ready.",
  });
});

/* =========================================================
   UPDATE LEAD
========================================================= */

app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;

  const {
    status,
    notes,
  } = req.body;

  const lead =
    leadsStore.find(
      (item) => item.id === id
    );

  if (!lead) {
    return res.status(404).json({
      success: false,
      error: "Lead not found.",
    });
  }

  if (status) {
    lead.status = status;
  }

  if (notes !== undefined) {
    lead.notes = notes;
  }

  return res.json({
    success: true,
    lead,
  });
});

/* =========================================================
   ANALYTICS
========================================================= */

app.get("/api/analytics", (_req, res) => {
  res.json({
    success: true,
    analytics: analyticsStore,
  });
});

app.post("/api/analytics/event", (req, res) => {
  const {
    type,
    payload,
  } = req.body;

  if (type === "page_view") {
    analyticsStore.pageViews++;
  }

  if (
    type === "search" &&
    payload?.niche
  ) {
    analyticsStore.searchesCount++;

    const existing =
      analyticsStore.topSearchedNiches.find(
        (item) =>
          item.niche.toLowerCase() ===
          String(payload.niche).toLowerCase()
      );

    if (existing) {
      existing.count++;
    } else {
      analyticsStore.topSearchedNiches.push({
        niche: String(payload.niche),
        count: 1,
      });
    }
  }

  if (type === "whatsapp_click") {
    analyticsStore.whatsappClicks++;
  }

  if (type === "phone_click") {
    analyticsStore.phoneClicks++;
  }

  return res.json({
    success: true,
  });
});

/* =========================================================
   VERCEL EXPORT
========================================================= */

export default app;