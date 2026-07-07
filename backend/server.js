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

// Helper function to check multiple key variations sent by your frontend forms
const pickFirstNonEmpty = (obj, keys) => {
    for (const key of keys) {
        const val = obj?.[key];
        if (typeof val === 'string' && val.trim() !== '') return val.trim();
        if (val !== undefined && val !== null && typeof val !== 'string' && String(val).trim() !== '') return String(val).trim();
    }
    return '';
};

// Reusable central handler logic for both forms
const handleIncomingRequest = async (req, res, sourceEndpoint) => {
    const body = req.body || {};
    
    // High visibility log in your Railway console to monitor exactly what keys come in
    console.log(`📥 Incoming request data to [${sourceEndpoint}]:`, JSON.stringify(body, null, 2));

    // Dynamic field matching to handle variations across Booking & Contact components
    const name = pickFirstNonEmpty(body, ['name', 'fullName', 'fullname']);
    const email = pickFirstNonEmpty(body, ['email', 'emailAddress', 'emailaddress']);
    const phone = pickFirstNonEmpty(body, ['phone', 'phoneNumber', 'phonenumber']);
    const problemDescription = pickFirstNonEmpty(body, ['problemDescription', 'details', 'message', 'issue']);

    const applianceType = body?.applianceType || body?.serviceType || '';
    const customApplianceType = body?.customApplianceType || '';
    const brand = body?.brand || '';
    const customBrand = body?.customBrand || '';
    const urgency = body?.urgency || 'Standard';
    const address = body?.address || '';
    const zipCode = body?.zipCode || body?.zipcode || '';
    const preferredDate = body?.preferredDate || '';

    try {
        const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;
        if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
            console.error("❌ Configuration Error: Missing environment variables inside your host settings.");
            return res.status(500).json({ success: false, message: 'Server email configuration missing.' });
        }

        // Validate mapped results
        if (!name || !email || !problemDescription) {
            console.warn(`⚠️ Validation failed on ${sourceEndpoint}. Missing keys fields. Detected status:`, { name, email, phone, problemDescription });
            return res.status(400).json({ success: false, message: 'Required validation inputs are missing or improperly mapped.' });
        }

        const reference = 'BK' + Date.now().toString().slice(-6);
        
        // Dynamically configure display tag if it's a structural contact form vs appliance booking
        const applianceName = applianceType 
            ? `${brand === 'Other' ? (customBrand || 'Unknown') : brand} ${applianceType === 'Other' ? customApplianceType || 'Appliance' : applianceType}`.trim()
            : 'General Service Inquiry';

        await transporter.sendMail({
            from: `"Aerotech Solution Inc" <${EMAIL_USER}>`,
            to: RECEIVER_EMAIL,
            replyTo: email,
            subject: `[${sourceEndpoint === '/api/book' ? 'Booking' : 'Inquiry'} ${reference}] ${urgency.toUpperCase()} — ${applianceName} (${name})`,
            text: [
                `Reference: ${reference}`,
                `Source Path: ${sourceEndpoint}`,
                `Urgency: ${urgency}`,
                '',
                `Customer: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone || 'Not provided'}`,
                `Address: ${address || 'N/A'}, ${zipCode || 'N/A'}`,
                '',
                `Service Focus: ${applianceName}`,
                `Details/Issue: ${problemDescription}`,
                `Preferred Date: ${preferredDate ? new Date(preferredDate).toDateString() : 'Not provided'}`,
            ].join('\n'),
        });

        console.log(`✅ Form processing succeeded for reference ${reference}`);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(`❌ ${sourceEndpoint} execution track error:`, error);
        return res.status(500).json({ success: false, message: 'Failed to process transmission pipelines.' });
    }
};

// Bind our dynamic paths directly to the master form tracker
app.post('/api/book', (req, res) => handleIncomingRequest(req, res, '/api/book'));
app.post('/api/contact', (req, res) => handleIncomingRequest(req, res, '/api/contact'));

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});