const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Health check — registered first so it's unaffected by CORS/rate-limit middleware below
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Contact form gets a stricter limit (5 submissions per 15 min per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many contact submissions. Please try again later.' }
});

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    }
  }
  next();
};

// Comma-separated list, e.g. "https://aerotechsolutioninc.com,https://www.aerotechsolutioninc.com"
const allowedOrigins = (
  process.env.ALLOWED_ORIGIN ||
  'https://aerotechsolutioninc.com,https://www.aerotechsolutioninc.com'
).split(',').map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
}));
app.use(express.json({ limit: '10kb' }));
app.use(sanitizeInput);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error) {
  if (error) {
    console.error('❌ Email Connection Error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// ─── Email Template Helpers ───────────────────────────────────────────────────

function emailWrapper(bodyHtml) {
  const year = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Aerotech Solution Inc</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
                Aerotech Solution Inc
              </h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                Professional Appliance Repair
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 6px;font-size:13px;color:#64748b;">
                &copy; ${year} Aerotech Solution Inc. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Licensed &amp; Insured &nbsp;|&nbsp; aerotechsolutioninc.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function contactAdminHtml({ name, email, phone, subject, message }) {
  return emailWrapper(`
    <h2 style="margin:0 0 6px;font-size:20px;color:#0f172a;">New Contact Inquiry</h2>
    <p style="margin:0 0 28px;font-size:13px;color:#64748b;">
      Submitted via aerotechsolutioninc.com
    </p>

    <!-- Sender badge -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:6px;padding:16px 20px;">
          <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;">${name}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#0ea5e9;">${email}</p>
          ${phone ? `<p style="margin:4px 0 0;font-size:13px;color:#64748b;">${phone}</p>` : ''}
        </td>
      </tr>
    </table>

    <!-- Details table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;width:30%;border-bottom:1px solid #e2e8f0;">Subject</td>
        <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${subject}</td>
      </tr>
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
        <td style="padding:12px 16px;font-size:14px;color:#0f172a;">${phone || 'Not provided'}</td>
      </tr>
    </table>

    <!-- Message -->
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${message}</div>

    <p style="margin:28px 0 0;font-size:13px;color:#94a3b8;">
      Reply directly to this email to respond to <strong>${name}</strong>.
    </p>
  `);
}

function contactCustomerHtml({ name, subject, message }) {
  return emailWrapper(`
    <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a;">Thank you, ${name}!</h2>
    <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.6;">
      We've received your message and our team will get back to you
      <strong>within 1 business day</strong>.
    </p>

    <!-- What to expect -->
    <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
      <tr>
        <td style="background:#f0fdf4;border-left:4px solid #22c55e;border-radius:6px;padding:16px 20px;">
          <p style="margin:0;font-size:14px;font-weight:700;color:#166534;">What happens next?</p>
          <p style="margin:8px 0 0;font-size:14px;color:#15803d;line-height:1.6;">
            A member of our team will review your inquiry and contact you at
            the email address you provided. For urgent matters, please call us directly.
          </p>
        </td>
      </tr>
    </table>

    <!-- Message summary -->
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Your message summary</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:28px;">
      <tr style="background:#f8fafc;">
        <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;width:25%;border-bottom:1px solid #e2e8f0;">Subject</td>
        <td style="padding:12px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${subject}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;vertical-align:top;">Message</td>
        <td style="padding:12px 16px;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap;">${message}</td>
      </tr>
    </table>

    <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">
      Best regards,<br/>
      <strong style="color:#0f172a;">Aerotech Solution Inc Team</strong>
    </p>
  `);
}

function bookingAdminHtml({ reference, urgency, name, email, phone, address, zipCode, applianceName, problemDescription, preferredDate }) {
  const urgencyColor = urgency === 'emergency' ? '#ef4444' : urgency === 'urgent' ? '#f97316' : '#22c55e';
  return emailWrapper(`
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td>
          <h2 style="margin:0 0 4px;font-size:20px;color:#0f172a;">New Service Booking</h2>
          <p style="margin:0;font-size:13px;color:#64748b;">Reference: <strong>${reference}</strong></p>
        </td>
        <td align="right">
          <span style="display:inline-block;background:${urgencyColor};color:#fff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:6px 14px;border-radius:20px;">${urgency}</span>
        </td>
      </tr>
    </table>

    <!-- Customer info -->
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Customer</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${[['Name', name], ['Email', email], ['Phone', phone], ['Address', `${address}, ${zipCode}`]].map(([label, value], i, arr) => `
      <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
        <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;width:28%;${i < arr.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}">${label}</td>
        <td style="padding:11px 16px;font-size:14px;color:#0f172a;${i < arr.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}">${value}</td>
      </tr>`).join('')}
    </table>

    <!-- Appliance info -->
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Appliance</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      <tr style="background:#f8fafc;">
        <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;width:28%;border-bottom:1px solid #e2e8f0;">Appliance</td>
        <td style="padding:11px 16px;font-size:14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${applianceName}</td>
      </tr>
      <tr>
        <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;vertical-align:top;">Issue</td>
        <td style="padding:11px 16px;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap;">${problemDescription}</td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Preferred Date</p>
    <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;">${new Date(preferredDate).toDateString()}</p>
  `);
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Fallback mapper for variable names sent by the frontend
function pickFirstNonEmpty(obj, keys) {
  for (const key of keys) {
    const val = obj?.[key];
    if (typeof val === 'string' && val.trim() !== '') return val.trim();
    if (val !== undefined && val !== null && typeof val !== 'string' && String(val).trim() !== '') return String(val).trim();
  }
  return '';
}

// Contact Form
app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body || {};

  const name = pickFirstNonEmpty(body, ['name', 'fullName']);
  const email = pickFirstNonEmpty(body, ['email', 'emailAddress']);
  const phone = pickFirstNonEmpty(body, ['phone', 'phoneNumber']);

  const subject = pickFirstNonEmpty(body, ['subject']);
  const message = pickFirstNonEmpty(body, ['message', 'problemDescription', 'details']);

  // Validate required fields (using mapped fallback values)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, subject, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  const companyEmail = process.env.COMPANY_EMAIL || process.env.EMAIL_USER;
  const data = { name, email, phone, subject, message };

  try {
    await transporter.sendMail({
      from: `"Aerotech Solution Inc" <${process.env.EMAIL_USER}>`,
      to: companyEmail,
      replyTo: data.email,
      subject: `[Contact] ${data.subject} — ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nSubject: ${data.subject}\n\n${data.message}`,
      html: contactAdminHtml(data),
    });

    await transporter.sendMail({
      from: `"Aerotech Solution Inc" <${process.env.EMAIL_USER}>`,
      to: data.email,
      replyTo: companyEmail,
      subject: `We received your message — Aerotech Solution Inc`,
      text: `Hi ${data.name},\n\nThank you for reaching out. We received your message about "${data.subject}" and will respond within 1 business day.\n\nBest regards,\nAerotech Solution Inc Team`,
      html: contactCustomerHtml(data),
    });

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('❌ Contact email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Booking Form
app.post('/api/book', async (req, res) => {
  // Basic validation to prevent silent failures
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid request body.' });
  }

  const body = req.body || {};

  const applianceType = body?.applianceType;
  const customApplianceType = body?.customApplianceType;
  const brand = body?.brand;
  const customBrand = body?.customBrand;

  const problemDescription = pickFirstNonEmpty(body, ['problemDescription', 'details', 'message']);
  const urgency = body?.urgency;

  const name = pickFirstNonEmpty(body, ['name', 'fullName']);
  const email = pickFirstNonEmpty(body, ['email', 'emailAddress']);
  const phone = pickFirstNonEmpty(body, ['phone', 'phoneNumber']);

  const address = body?.address;
  const zipCode = body?.zipCode;
  const preferredDate = body?.preferredDate;


  // Validate required fields (using mapped fallback values)
  if (!name || !email || !phone || !problemDescription) {
    return res.status(400).json({ success: false, message: 'Name, email, phone, and problem description are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  const reference = 'BK' + Date.now().toString().slice(-6);
  const applianceName = `${brand === 'Other' ? (customBrand || 'Unknown Brand') : brand} ${applianceType === 'Other' ? (customApplianceType || 'Appliance') : applianceType}`.trim();

  // Must use these env vars for routing emails
  const companyEmail = process.env.RECEIVER_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER;

  const adminData = { reference, urgency, name, email, phone, address, zipCode, applianceName, problemDescription, preferredDate };

  try {
    await transporter.sendMail({
      from: `"Aerotech Solution Inc" <${process.env.EMAIL_USER}>`,
      to: companyEmail,
      replyTo: email,
      subject: `[Booking ${reference}] ${urgency?.toUpperCase()} — ${applianceName} (${name})`,
      text: `Reference: ${reference}\nUrgency: ${urgency}\n\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}, ${zipCode}\n\nAppliance: ${applianceName}\nIssue: ${problemDescription}\nPreferred Date: ${new Date(preferredDate).toDateString()}`,
      html: bookingAdminHtml(adminData),
    });

    await transporter.sendMail({
      from: `"Aerotech Solution Inc" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: companyEmail,
      subject: `Service Request Received — Aerotech Solution Inc [${reference}]`,
      text: `Hello ${name},\n\nWe received your service request for your ${applianceName}. A certified technician will call you at ${phone} within 60 minutes to confirm your appointment.\n\nReference ID: ${reference}\n\nBest regards,\nAerotech Solution Inc`,
      html: emailWrapper(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a;">Service Request Received</h2>
        <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.6;">
          Hello <strong>${name}</strong>, we have received your request regarding your <strong>${applianceName}</strong>.
          Our lead technician is currently reviewing your diagnostics.
        </p>

        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
          <tr>
            <td style="background:#f0f9ff;border-left:4px solid #0ea5e9;border-radius:6px;padding:16px 20px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#0c4a6e;">Expect a call within 60 minutes</p>
              <p style="margin:6px 0 0;font-size:14px;color:#0369a1;line-height:1.5;">
                A certified technician will contact you at <strong>${phone}</strong> to confirm your appointment time.
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">What's next?</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          ${[
            ['1', 'Diagnostic Review', 'Our team analyzes the issue to prepare the right parts and tools.'],
            ['2', 'Dispatch', 'A certified technician is assigned and dispatched to your location.'],
            ['3', 'On-site Repair', 'We arrive fully equipped to restore your appliance.'],
          ].map(([num, title, desc]) => `
          <tr>
            <td style="padding:10px 0;vertical-align:top;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:36px;">
                    <span style="display:inline-block;width:28px;height:28px;background:#0f172a;color:#fff;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;">${num}</span>
                  </td>
                  <td style="padding-left:12px;">
                    <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${title}</p>
                    <p style="margin:3px 0 0;font-size:13px;color:#64748b;">${desc}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`).join('')}
        </table>

        <p style="margin:0 0 20px;font-size:13px;color:#94a3b8;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:12px 16px;">
          Reference ID: <strong style="color:#0f172a;">${reference}</strong>
        </p>

        <p style="margin:0;font-size:14px;color:#475569;line-height:1.7;">
          Best regards,<br/>
          <strong style="color:#0f172a;">Aerotech Solution Inc Team</strong>
        </p>
      `),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Booking email error:', error);
    res.status(500).json({ success: false, message: 'Failed to process booking. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
