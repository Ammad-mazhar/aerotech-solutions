import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      'https://aerotechsolutioninc.com', 
      'https://www.aerotechsolutioninc.com',
      'http://localhost:5173' // Keeps local testing working
    ],
    methods: ['POST'],
    credentials: true
  })
);

app.use(express.json({ limit: '10kb' }));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // FORCES RAILWAY TO USE IPv4 AND PREVENTS TIMEOUTS
  connectionTimeout: 10000, 
  socketTimeout: 10000,
});

// POST /api/book
app.post('/api/book', async (req, res) => {
  const body = req.body || {};

  const {
    applianceType,
    customApplianceType,
    brand,
    customBrand,
    problemDescription,
    urgency,
    name,
    email,
    phone,
    address,
    zipCode,
    preferredDate,
  } = body;

  try {
    // Ensure required env vars exist
    const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
      return res.status(500).json({
        success: false,
        message: 'Server email configuration missing (EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL).',
      });
    }

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !problemDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, problemDescription',
      });
    }

    const reference = 'BK' + Date.now().toString().slice(-6);

    const applianceName = `${
      brand === 'Other' ? (customBrand || 'Unknown Brand') : brand
    } ${
      applianceType === 'Other'
        ? customApplianceType || 'Appliance'
        : applianceType
    }`.trim();

    await transporter.sendMail({
      from: `"Aerotech Solution Inc" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `[Booking ${reference}] ${urgency?.toUpperCase() || 'STANDARD'} — ${applianceName} (${name})`,
      text: [
        `Reference: ${reference}`,
        `Urgency: ${urgency || 'standard'}`,
        '',
        `Customer: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Address: ${address || ''}, ${zipCode || ''}`,
        '',
        `Appliance: ${applianceName}`,
        `Issue: ${problemDescription}`,
        `Preferred Date: ${preferredDate ? new Date(preferredDate).toDateString() : 'Not provided'}`,
      ].join('\n'),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ /api/book error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process booking. Please try again later.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

