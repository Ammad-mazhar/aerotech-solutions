import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: [
            'https://aerotechsolutioninc.com',
            'https://www.aerotechsolutioninc.com',
            'http://localhost:5173'
        ],
        methods: ['POST'],
        credentials: true
    })
);

app.use(express.json({ limit: '10kb' }));

// Initialize the HTTPS Google OAuth2 Client
const oauth2Client = new OAuth2Client(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

// Helper to check multiple frontend key variations
const pickFirstNonEmpty = (obj, keys) => {
    for (const key of keys) {
        const val = obj?.[key];
        if (typeof val === 'string' && val.trim() !== '') return val.trim();
        if (val !== undefined && val !== null && typeof val !== 'string' && String(val).trim() !== '') return String(val).trim();
    }
    return '';
};

// Reusable handler that sends email via HTTPS POST API calls instead of SMTP ports
const handleIncomingRequest = async (req, res, sourceEndpoint) => {
    const body = req.body || {};
    console.log(`📥 Incoming data to [${sourceEndpoint}]:`, JSON.stringify(body, null, 2));

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
        const { EMAIL_USER, RECEIVER_EMAIL } = process.env;
        if (!EMAIL_USER || !RECEIVER_EMAIL) {
            return res.status(500).json({ success: false, message: 'Server configuration missing.' });
        }

        if (!name || !email || !problemDescription) {
            return res.status(400).json({ success: false, message: 'Required fields are missing.' });
        }

        const reference = 'BK' + Date.now().toString().slice(-6);
        const applianceName = applianceType 
            ? `${brand === 'Other' ? (customBrand || 'Unknown') : brand} ${applianceType === 'Other' ? customApplianceType || 'Appliance' : applianceType}`.trim()
            : 'General Service Inquiry';

        // Construct standard raw email text string
        const emailLines = [
            `From: "Aerotech Solution Inc" <${EMAIL_USER}>`,
            `To: ${RECEIVER_EMAIL}`,
            `Reply-To: ${email}`,
            `Subject: [${sourceEndpoint === '/api/book' ? 'Booking' : 'Inquiry'} ${reference}] ${urgency.toUpperCase()} — ${applianceName} (${name})`,
            `Content-Type: text/plain; charset="utf-8"`,
            '',
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
        ];

        const rawMessage = Buffer.from(emailLines.join('\n'))
            .toString('base64url'); // Base64URL encoding required by Gmail API

        // Get an active access token using the refresh token securely
        const { token } = await oauth2Client.getAccessToken();

        // Direct HTTPS API Request to Google (Bypasses SMTP port restrictions entirely)
        const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/send`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw: rawMessage })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`Gmail API response error: ${JSON.stringify(errData)}`);
        }

        console.log(`✅ Email sent securely over HTTPS! Reference: ${reference}`);
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error(`❌ ${sourceEndpoint} API error:`, error.message);
        return res.status(500).json({ success: false, message: 'Failed to complete message delivery.' });
    }
};

app.post('/api/book', (req, res) => handleIncomingRequest(req, res, '/api/book'));
app.post('/api/contact', (req, res) => handleIncomingRequest(req, res, '/api/contact'));

app.listen(PORT, () => {
    console.log(`🚀 API-Driven Backend running on port ${PORT}`);
});