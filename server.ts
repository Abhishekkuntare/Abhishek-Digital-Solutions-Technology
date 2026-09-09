import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Target notification email requested by the user
const TARGET_NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ||
  'abhishekkuntare02@gmail.com';

// Data storage files
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const EMAIL_LOGS_FILE = path.join(DATA_DIR, 'email_logs.json');

// In-memory data store for leads, analytics, and email notifications
export interface EmailLogRecord {
  id: string;
  sentAt: string;
  to: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type: 'project_roadmap' | 'contact_form' | 'ai_blueprint' | 'score_audit';
  summary: string;
  status: 'sent' | 'delivered' | 'logged' | 'pending_activation';
  notes?: string;
}

const emailLogsStore: EmailLogRecord[] = [];

function saveEmailLogsToFile() {
  try {
    fs.writeFileSync(EMAIL_LOGS_FILE, JSON.stringify(emailLogsStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing email logs:', e);
  }
}

function loadEmailLogsFromFile() {
  try {
    if (fs.existsSync(EMAIL_LOGS_FILE)) {
      const data = JSON.parse(fs.readFileSync(EMAIL_LOGS_FILE, 'utf8'));
      if (Array.isArray(data)) {
        emailLogsStore.length = 0;
        emailLogsStore.push(...data);
      }
    }
  } catch (e) {
    console.error('Error loading email logs:', e);
  }
}
loadEmailLogsFromFile();

// Nodemailer + FormSubmit live dispatch
async function sendNotificationEmail(params: {
  subject: string;
  htmlContent: string;
  textContent: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type: 'project_roadmap' | 'contact_form' | 'ai_blueprint' | 'score_audit';
  summary: string;
  metadata?: Record<string, any>;
}) {
  const logId = `mail-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const { subject, htmlContent, textContent, senderName, senderEmail, senderPhone, type, summary, metadata } = params;

  console.log(`\n==================================================`);
  console.log(`📬 NOTIFICATION DISPATCHING TO: ${TARGET_NOTIFICATION_EMAIL}`);
  console.log(`Subject: ${subject}`);
  console.log(`From: ${senderName} <${senderEmail}> | Phone: ${senderPhone}`);
  console.log(`Type: ${type}`);
  console.log(`==================================================\n`);

  let deliveryStatus: 'sent' | 'delivered' | 'logged' | 'pending_activation' = 'logged';
  let notes = `Logged for ${TARGET_NOTIFICATION_EMAIL}`;
  let formSubmitMessage = '';

  // 1. LIVE HTTPS FormSubmit.co Relay directly to TARGET_NOTIFICATION_EMAIL (abhishekkuntare02@gmail.com)
  try {
   const formSubmitRes = await fetch(
  `https://formsubmit.co/ajax/${TARGET_NOTIFICATION_EMAIL}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: `🔥 [Abhishek Digital] ${subject}`,
      _replyto: senderEmail,
      _template: 'table',
      _captcha: 'false',

      'Lead / Client Name': senderName,
      'Email Address': senderEmail,
      'Phone / WhatsApp': senderPhone,
      'Submission Type': type,
      'Summary': summary,
      'Detailed Specifications': textContent,
      'Forwarded Target': TARGET_NOTIFICATION_EMAIL,
      'Timestamp': new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
      })
    })
  }
);

    const formSubmitData = await formSubmitRes.json().catch(() => ({}));
    console.log(`[FormSubmit Response for ${TARGET_NOTIFICATION_EMAIL}]:`, formSubmitData);

    if (formSubmitData.success === 'true' || formSubmitData.success === true) {
      deliveryStatus = 'sent';
      notes = `Delivered directly to ${TARGET_NOTIFICATION_EMAIL} inbox via FormSubmit relay`;
      console.log(`[FormSubmit SUCCESS] Delivered to ${TARGET_NOTIFICATION_EMAIL}`);
    } else if (formSubmitData.message && formSubmitData.message.includes('Activation')) {
      deliveryStatus = 'pending_activation';
      formSubmitMessage = formSubmitData.message;
      notes = `Activation required: Check ${TARGET_NOTIFICATION_EMAIL} inbox for FormSubmit activation button`;
      console.log(`[FormSubmit NOTICE] Activation email sent to ${TARGET_NOTIFICATION_EMAIL}`);
    } else {
      notes = `FormSubmit response: ${formSubmitData.message || 'Queued for relay'}`;
    }
  } catch (fsErr: any) {
    console.warn(`[FormSubmit Warning]:`, fsErr.message);
  }

  // 2. If SMTP environment variables are present, also attempt live SMTP transport
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${senderName} via Abhishek Digital" <${process.env.SMTP_USER}>`,
        to: TARGET_NOTIFICATION_EMAIL,
        replyTo: senderEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });

      deliveryStatus = 'sent';
      notes = `Delivered via SMTP to ${TARGET_NOTIFICATION_EMAIL}`;
      console.log(`[SMTP SUCCESS] Mail delivered to ${TARGET_NOTIFICATION_EMAIL}`);
    } catch (smtpErr) {
      console.warn(`[SMTP NOTICE] Could not deliver via SMTP:`, smtpErr);
    }
  }

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
    status: deliveryStatus,
    notes,
  };

  emailLogsStore.unshift(emailLog);
  saveEmailLogsToFile();
  return { emailLog, formSubmitMessage };
}

// In-memory data store for leads and analytics
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
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'In Discussion' | 'Won' | 'Lost';
  notes?: string;
}

const leadsStore: LeadRecord[] = [
  {
    id: 'lead-101',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Dr. Sarah Jenkins',
    businessName: 'Coastal Smiles Dental',
    email: 'sarah@coastalsmiles.example',
    phone: '+1 415-555-0182',
    country: 'United States',
    businessNiche: 'Dental Clinic',
    servicesRequired: ['Website', 'Appointment Booking', 'WhatsApp AI Bot', 'Local SEO'],
    platforms: ['Website', 'Tablet'],
    goals: ['Get Leads', 'Book Appointments', 'Automate Business'],
    timeline: '2–4 weeks',
    budgetRange: '$2,500 – $5,000',
    projectDescription: 'We want to revamp our dental practice website and install automated appointment reminders to stop patient no-shows.',
    status: 'New',
    notes: 'Requested a video walkthrough demo.'
  },
  {
    id: 'lead-102',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Vikram Mehta',
    businessName: 'Spice Route Fine Dining',
    email: 'vikram@spiceroute.example',
    phone: '+91 98200 12345',
    country: 'India',
    businessNiche: 'Restaurant',
    servicesRequired: ['Website', 'Online Ordering', 'QR Table Menu', 'Google SEO'],
    platforms: ['Website', 'Android', 'iOS'],
    goals: ['Sell Products', 'Book Appointments', 'Build Brand'],
    timeline: 'ASAP',
    budgetRange: '₹1,50,000 – ₹3,00,000',
    projectDescription: 'Want to stop paying 28% commissions to Swiggy/Zomato. Need our own direct delivery ordering platform.',
    status: 'Proposal Sent',
    notes: 'Sent Growth Package proposal.'
  }
];

function saveLeadsToFile() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving leads to file:', e);
  }
}

function loadLeadsFromFile() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
      if (Array.isArray(data) && data.length > 0) {
        leadsStore.length = 0;
        leadsStore.push(...data);
      }
    }
  } catch (e) {
    console.error('Error loading leads from file:', e);
  }
}
loadLeadsFromFile();

const analyticsStore = {
  pageViews: 1420,
  searchesCount: 680,
  topSearchedNiches: [
    { niche: 'Dental Clinic', count: 184 },
    { niche: 'Restaurant', count: 142 },
    { niche: 'Real Estate Agency', count: 98 },
    { niche: 'Gyms & Fitness', count: 76 },
    { niche: 'General Contractor', count: 64 }
  ],
  quoteRequests: 18,
  whatsappClicks: 42,
  phoneClicks: 21
};

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Consultant endpoint using Gemini SDK
app.post('/api/ai/consultant', async (req, res) => {
  try {
    const { businessType, description, targetGoals, budget } = req.body;

    if (!businessType) {
      return res.status(400).json({ error: 'Business type or description is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const prompt = `You are Abhishek's AI Digital Growth Consultant for businesses worldwide.
A business owner has asked for a recommended digital roadmap.
Business Type/Niche: "${businessType}"
Business Context/Details: "${description || 'None provided'}"
Target Goals: "${targetGoals || 'Customer acquisition & modern digital presence'}"
Budget Context: "${budget || 'Standard commercial'}"

Provide a sharp, high-converting digital blueprint in strict JSON format with this exact structure:
{
  "nicheSummary": "1-2 sentence executive assessment of this business niche and its digital growth opportunity.",
  "recommendedWebsite": "Key features required for their website/web app.",
  "recommendedMobile": "What mobile or PWA solutions would benefit them.",
  "recommendedAI": "Practical AI automation, chatbot, or agent workflows.",
  "recommendedMarketing": "Local SEO, Google Ads, or social media strategy.",
  "quickWin": "One immediate high-impact action they can take this week.",
  "recommendedServices": ["Service 1", "Service 2", "Service 3", "Service 4"],
  "estimatedTimeline": "e.g. 2–4 weeks"
}
Do not wrap in markdown quotes if possible, return pure JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText.trim());
        return res.json({ success: true, plan: parsed, provider: 'gemini-3.8-flash' });
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to smart heuristic:', geminiError);
      }
    }

    // Smart heuristic fallback if API key is not configured or fails
    const cleanType = String(businessType).toLowerCase();
    let nicheSummary = `For ${businessType}, modern digital trust and automated client booking represent the highest leverage points.`;
    let recommendedWebsite = `Ultra-fast responsive website with high-converting showcase gallery, customer reviews, and clear localized service breakdown.`;
    let recommendedMobile = `Mobile-first Progressive Web App (PWA) with push notifications and instant thumb-friendly contact buttons.`;
    let recommendedAI = `24/7 WhatsApp AI Customer Support assistant trained on your FAQs, operating hours, and service catalog to capture after-hours inquiries.`;
    let recommendedMarketing = `Google Business Profile optimization to rank in top-3 Google Maps pack, plus localized search ads.`;
    let quickWin = `Implement a direct 1-click WhatsApp booking trigger on your primary page to immediately stop bounce-offs.`;
    let recommendedServices = ['High-Speed Business Website', 'Online Booking / Order System', '24/7 WhatsApp AI Assistant', 'Local SEO Dominance'];

    if (cleanType.includes('dental') || cleanType.includes('doctor') || cleanType.includes('clinic')) {
      nicheSummary = `Dental practices scale fastest when combining real smile proof, real-time calendar booking, and automated reminder sequences to stop no-shows.`;
      recommendedWebsite = `Interactive smile gallery, treatment breakdown (implants, Invisalign), and 24/7 calendar appointment scheduler.`;
      recommendedAI = `WhatsApp automated appointment confirmation, day-before reminder broadcasts, and review collection bot.`;
      recommendedMarketing = `Dominate local "best dentist in [city]" Google Maps searches and high-intent Google Search Ads.`;
      recommendedServices = ['Interactive Clinic Website', 'Online Appointment Booking', 'WhatsApp AI Patient Assistant', 'Local SEO & Reviews Engine'];
    } else if (cleanType.includes('restaurant') || cleanType.includes('food') || cleanType.includes('cafe')) {
      nicheSummary = `Culinary brands maximize profit by replacing 28% third-party aggregator commissions with zero-commission direct ordering and QR menus.`;
      recommendedWebsite = `Visual digital menu, table reservation engine, and frictionless direct delivery ordering.`;
      recommendedAI = `Automated WhatsApp order status updates and promotional festival broadcasting.`;
      recommendedMarketing = `Mouth-watering photography optimization, Instagram reel creatives, and Google Maps local discovery.`;
      recommendedServices = ['Digital Menu & Direct Food Ordering', 'Table Reservation Engine', 'QR Code Dine-In System', 'Google Business Optimization'];
    } else if (cleanType.includes('real estate') || cleanType.includes('realtor') || cleanType.includes('property')) {
      nicheSummary = `Real estate brokerages require interactive 3D property tours paired with automated buyer qualification to protect agent time.`;
      recommendedWebsite = `Interactive map property search, Matterport 3D walkthroughs, and localized mortgage calculator.`;
      recommendedAI = `Buyer budget & timeline qualification chatbot that forwards pre-screened leads directly to the broker.`;
      recommendedMarketing = `Geo-targeted Google PPC campaigns for high-ticket developments and luxury villa buyers.`;
      recommendedServices = ['Luxury Property Discovery Portal', 'Interactive Map & Filter Search', 'Automated Lead Qualification Bot', 'Mortgage Calculator'];
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
        estimatedTimeline: '2–4 weeks'
      },
      provider: 'intelligent-engine'
    });
  } catch (error) {
    console.error('AI Consultant error:', error);
    res.status(500).json({ error: 'Failed to generate digital roadmap.' });
  }
});

// Leads Endpoints
app.get('/api/leads', (req, res) => {
  res.json({ success: true, leads: leadsStore });
});

app.post('/api/leads', async (req, res) => {
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
      projectDescription
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(name).trim(),
      businessName: String(businessName || '').trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      country: String(country || 'Not specified').trim(),
      businessNiche: String(businessNiche || 'General Business').trim(),
      servicesRequired: Array.isArray(servicesRequired) ? servicesRequired : [],
      platforms: Array.isArray(platforms) ? platforms : ['Website'],
      goals: Array.isArray(goals) ? goals : ['Get Leads'],
      timeline: String(timeline || 'Flexible').trim(),
      budgetRange: String(budgetRange || 'Flexible').trim(),
      projectDescription: String(projectDescription || '').trim(),
      status: 'New'
    };

    leadsStore.unshift(newLead);
    analyticsStore.quoteRequests += 1;

    // Send email notification to abhishekkuntare02@gmail.com
    const servicesList = newLead.servicesRequired.join(', ') || 'Not specified';
    const platformsList = newLead.platforms.join(', ') || 'Website';
    const goalsList = newLead.goals.join(', ') || 'Business Growth';

    const emailSubject = `🚀 Project Roadmap Received! [${newLead.businessNiche}] from ${newLead.name}`;
    const emailText = `
PROJECT ROADMAP RECEIVED!
Target Mail: ${TARGET_NOTIFICATION_EMAIL}
Date: ${new Date().toLocaleString()}

CLIENT DETAILS:
- Name: ${newLead.name}
- Business: ${newLead.businessName || 'None specified'}
- Email: ${newLead.email}
- Phone/WhatsApp: ${newLead.phone}
- Country: ${newLead.country}
- Business Niche: ${newLead.businessNiche}

SPECIFICATIONS:
- Services: ${servicesList}
- Platforms: ${platformsList}
- Goals: ${goalsList}
- Budget Range: ${newLead.budgetRange}
- Timeline: ${newLead.timeline}

PROJECT DESCRIPTION:
${newLead.projectDescription || 'No additional notes provided.'}
    `.trim();

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; background: #0c101c; color: #f1f5f9; padding: 28px; border-radius: 16px; border: 1px solid #1e293b;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">🚀 Project Roadmap Received!</h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">
            Target Mailbox: <span style="color: #38bdf8; font-weight: 700;">${TARGET_NOTIFICATION_EMAIL}</span>
          </p>
        </div>
        
        <div style="background: #111728; padding: 18px; border-radius: 12px; margin-bottom: 18px; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; font-size: 15px; margin-top: 0; margin-bottom: 12px;">👤 Client Contact Information</h2>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; color: #94a3b8; width: 140px;">Name:</td><td style="color: #ffffff; font-weight: bold;">${newLead.name}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Business Name:</td><td style="color: #ffffff;">${newLead.businessName || 'Not specified'}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Email:</td><td><a href="mailto:${newLead.email}" style="color: #38bdf8;">${newLead.email}</a></td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Phone / WhatsApp:</td><td><a href="https://wa.me/${newLead.phone.replace(/[^0-9]/g, '')}" style="color: #34d399; font-weight: bold;">${newLead.phone}</a></td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Country / Location:</td><td style="color: #ffffff;">${newLead.country}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Niche / Industry:</td><td style="color: #f59e0b; font-weight: bold;">${newLead.businessNiche}</td></tr>
          </table>
        </div>

        <div style="background: #111728; padding: 18px; border-radius: 12px; margin-bottom: 18px; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; font-size: 15px; margin-top: 0; margin-bottom: 12px;">🛠️ Scope & Roadmap Specifications</h2>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; color: #94a3b8; width: 140px;">Services:</td><td style="color: #ffffff;">${servicesList}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Target Platforms:</td><td style="color: #ffffff;">${platformsList}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Primary Goals:</td><td style="color: #ffffff;">${goalsList}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Budget Range:</td><td style="color: #34d399; font-weight: bold;">${newLead.budgetRange}</td></tr>
            <tr><td style="padding: 5px 0; color: #94a3b8;">Timeline:</td><td style="color: #ffffff;">${newLead.timeline}</td></tr>
          </table>
        </div>

        ${newLead.projectDescription ? `
        <div style="background: #111728; padding: 18px; border-radius: 12px; margin-bottom: 18px; border: 1px solid #1e293b;">
          <h2 style="color: #38bdf8; font-size: 15px; margin-top: 0; margin-bottom: 8px;">📝 Project Description & Notes</h2>
          <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${newLead.projectDescription}</p>
        </div>` : ''}

        <div style="text-align: center; padding-top: 14px; border-top: 1px solid #1e293b;">
          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 12px;">Immediate Actions for Abhishek:</p>
          <a href="https://wa.me/${newLead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(newLead.name)},%20this%20is%20Abhishek%20from%20Abhishek%20Digital%20Studio.%20I%20received%20your%20project%20roadmap%20for%20${encodeURIComponent(newLead.businessName || newLead.businessNiche)}!" style="display: inline-block; background: #10b981; color: #000000; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; margin-right: 8px;">
            Reply on WhatsApp
          </a>
          <a href="mailto:${newLead.email}?subject=Project%20Roadmap%20Proposal%20-%20Abhishek%20Digital&body=Hi%20${encodeURIComponent(newLead.name)},%0A%0AThank%20you%20for%20submitting%20your%20project%20roadmap.%0A" style="display: inline-block; background: #0284c7; color: #ffffff; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
            Reply via Email
          </a>
        </div>
      </div>
    `;

    const emailLogResult = await sendNotificationEmail({
      subject: emailSubject,
      htmlContent: emailHtml,
      textContent: emailText,
      senderName: newLead.name,
      senderEmail: newLead.email,
      senderPhone: newLead.phone,
      type: 'project_roadmap',
      summary: `${newLead.businessNiche} roadmap submitted with budget ${newLead.budgetRange}`
    });

    saveLeadsToFile();

    res.status(201).json({
      success: true,
      message: `Project roadmap received! Dispatched to ${TARGET_NOTIFICATION_EMAIL}.`,
      leadId: newLead.id,
      notificationSentTo: TARGET_NOTIFICATION_EMAIL,
      emailLogId: emailLogResult.emailLog.id,
      deliveryStatus: emailLogResult.emailLog.status,
      needsActivation: emailLogResult.emailLog.status === 'pending_activation',
      activationNotice: emailLogResult.formSubmitMessage || null
    });
  } catch (err) {
    console.error('Lead creation error:', err);
    res.status(500).json({ error: 'Could not submit proposal request.' });
  }
});

// Dedicated endpoint to send custom inquiries / form submissions to abhishekkuntare02@gmail.com
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, subject, message, formType, metadata } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const emailSubject = subject || `📩 New Inquiry from ${name} [${formType || 'Website Form'}]`;
    const textContent = `
NEW FORM SUBMISSION:
Target: ${TARGET_NOTIFICATION_EMAIL}
Form Type: ${formType || 'Website Form'}
From: ${name} (${email})
Phone: ${phone || 'Not provided'}

Message:
${message || 'No additional message'}

Metadata:
${JSON.stringify(metadata || {}, null, 2)}
    `.trim();

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0c101c; color: #f1f5f9; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin-top: 0;">📩 New Form Submission Received</h2>
        <p style="color: #94a3b8; font-size: 13px;">Routed directly to: <strong>${TARGET_NOTIFICATION_EMAIL}</strong></p>
        <div style="background: #111728; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin: 4px 0;"><strong>Type:</strong> ${formType || 'Inquiry'}</p>
        </div>
        <div style="background: #111728; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; color: #cbd5e1; white-space: pre-wrap;">${message || 'No message body.'}</p>
        </div>
        <div style="text-align: center; margin-top: 16px;">
          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(emailSubject)}" style="display: inline-block; background: #0284c7; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px;">
            Reply to ${name}
          </a>
        </div>
      </div>
    `;

    const emailLogResult = await sendNotificationEmail({
      subject: emailSubject,
      htmlContent,
      textContent,
      senderName: name,
      senderEmail: email,
      senderPhone: phone || 'N/A',
      type: formType === 'ai_blueprint' ? 'ai_blueprint' : formType === 'score_audit' ? 'score_audit' : 'contact_form',
      summary: message ? message.slice(0, 100) : `${formType} form submission`,
      metadata
    });

    res.json({
      success: true,
      message: `Form successfully received and dispatched to ${TARGET_NOTIFICATION_EMAIL}`,
      notificationSentTo: TARGET_NOTIFICATION_EMAIL,
      emailLogId: emailLogResult.emailLog.id,
      deliveryStatus: emailLogResult.emailLog.status,
      needsActivation: emailLogResult.emailLog.status === 'pending_activation',
      activationNotice: emailLogResult.formSubmitMessage || null
    });
  } catch (err) {
    console.error('Send-email error:', err);
    res.status(500).json({ error: 'Failed to process email dispatch.' });
  }
});

// Test Email Dispatcher Endpoint
app.post('/api/send-test-email', async (req, res) => {
  try {
    const result = await sendNotificationEmail({
      subject: `🧪 Test Lead Inquiry for Abhishek from System Verification`,
      htmlContent: `<p>Hello Abhishek! This is a test email verification sent to <strong>${TARGET_NOTIFICATION_EMAIL}</strong>.</p>`,
      textContent: `Hello Abhishek! This is a test email notification sent to ${TARGET_NOTIFICATION_EMAIL} at ${new Date().toLocaleString('en-IN')}`,
      senderName: 'Abhishek Studio Lead Bot',
      senderEmail: 'notifications@abhishek.digital',
      senderPhone: '+91 9156075536',
      type: 'contact_form',
      summary: 'System test verification for email inbox'
    });

    res.json({
      success: true,
      message: `Test email dispatched to ${TARGET_NOTIFICATION_EMAIL}`,
      targetEmail: TARGET_NOTIFICATION_EMAIL,
      log: result.emailLog,
      needsActivation: result.emailLog.status === 'pending_activation',
      activationMessage: result.formSubmitMessage || null
    });
  } catch (err: any) {
    console.error('Test email error:', err);
    res.status(500).json({ error: err.message || 'Failed to dispatch test email' });
  }
});

// CSV Export for Leads
app.get('/api/export-leads', (req, res) => {
  try {
    const headers = ['ID', 'Date', 'Name', 'Business', 'Email', 'Phone', 'Country', 'Niche', 'Services', 'Budget', 'Timeline', 'Status', 'Description'];
    const rows = leadsStore.map(l => [
      l.id,
      `"${l.createdAt}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.businessName || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.country || '').replace(/"/g, '""')}"`,
      `"${(l.businessNiche || '').replace(/"/g, '""')}"`,
      `"${(l.servicesRequired.join('; ') || '').replace(/"/g, '""')}"`,
      `"${(l.budgetRange || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.projectDescription || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leads-abhishek-${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export leads' });
  }
});

// Email Relay Status
app.get('/api/email-status', (req, res) => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const recentLog = emailLogsStore[0] || null;
  res.json({
    targetEmail: TARGET_NOTIFICATION_EMAIL,
    smtpConfigured: hasSmtp,
    formSubmitRelayActive: true,
    totalDispatched: emailLogsStore.length,
    recentStatus: recentLog ? recentLog.status : 'ready',
    recentNotes: recentLog ? recentLog.notes : 'Ready to route inquiries to abhishekkuntare02@gmail.com'
  });
});

// Outbound Email Logs for Admin CMS
app.get('/api/email-logs', (req, res) => {
  res.json({
    success: true,
    targetEmail: TARGET_NOTIFICATION_EMAIL,
    totalLogs: emailLogsStore.length,
    logs: emailLogsStore
  });
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const lead = leadsStore.find(l => l.id === id);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found.' });
  }

  if (status) lead.status = status;
  if (notes !== undefined) lead.notes = notes;

  saveLeadsToFile();

  res.json({ success: true, lead });
});

// Analytics Endpoints
app.get('/api/analytics', (req, res) => {
  res.json({ success: true, analytics: analyticsStore });
});

app.post('/api/analytics/event', (req, res) => {
  const { type, payload } = req.body;
  if (type === 'page_view') {
    analyticsStore.pageViews += 1;
  } else if (type === 'search' && payload?.niche) {
    analyticsStore.searchesCount += 1;
    const existing = analyticsStore.topSearchedNiches.find(
      item => item.niche.toLowerCase() === payload.niche.toLowerCase()
    );
    if (existing) {
      existing.count += 1;
    } else {
      analyticsStore.topSearchedNiches.push({ niche: payload.niche, count: 1 });
    }
  } else if (type === 'whatsapp_click') {
    analyticsStore.whatsappClicks += 1;
  } else if (type === 'phone_click') {
    analyticsStore.phoneClicks += 1;
  }
  res.json({ success: true });
});


if (!process.env.VERCEL) {
  const distPath = path.join(__dirname, "dist");

  // Serve Vite production build
  app.use(express.static(distPath));

  // Frontend fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Abhishek Digital running at http://localhost:${PORT}`);
  });
}