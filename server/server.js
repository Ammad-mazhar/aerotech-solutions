const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Transporter (Configure with your email provider)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or configure host/port for others
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Email Connection Error:', error);
  } else {
    console.log('✅ Email Server is ready to send messages');
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const adminMailOptions = {
    from: `"Aero Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to yourself
    replyTo: email,
    subject: `New Contact Inquiry: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'N/A'}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
  };

  const customerMailOptions = {
    from: `"Aero Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: email, // Send to customer
    subject: `Received: ${subject} - Aero Tech Solutions`,
    text: `
      Hi ${name},

      Thank you for contacting Aero Tech Solutions. We have received your message and will get back to you as soon as possible.

      Your Message:
      ${message}

      Best regards,
      Aero Tech Solutions Team
    `,
  };

  try {
    // Send Admin Notification
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('✅ Contact: Admin notification sent. ID:', adminInfo.messageId);

    // Send Customer Auto-Responder
    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log(`✅ Contact: Auto-responder sent to ${email}. ID:`, customerInfo.messageId);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send email. Check server logs.' 
    });
  }
});

// Booking Form Endpoint
app.post('/api/book', async (req, res) => {
  const { 
    applianceType, customApplianceType, brand, customBrand, 
    problemDescription, urgency, name, email, phone, address, zipCode, preferredDate 
  } = req.body;

  // Generate Booking Reference
  const reference = 'BK' + Date.now().toString().slice(-6);

  const adminMailOptions = {
    from: `"Aero Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to yourself
    replyTo: email,
    subject: `New Service Booking [${reference}] - ${urgency.toUpperCase()}`,
    text: `
      New Booking Request
      Reference ID: ${reference}
      Urgency: ${urgency}
      
      Customer Details:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}, ${zipCode}
      
      Appliance Details:
      Type: ${applianceType === 'Other' ? customApplianceType : applianceType}
      Brand: ${brand === 'Other' ? customBrand : brand}
      
      Issue Description:
      ${problemDescription}
      
      Preferred Date: ${new Date(preferredDate).toDateString()}
    `,
  };

  const applianceName = brand === 'Other' ? (applianceType === 'Other' ? customApplianceType : applianceType) : `${brand} ${applianceType === 'Other' ? customApplianceType : applianceType}`;

  const customerMailOptions = {
    from: `"Aero Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: email, // Send to customer
    replyTo: process.env.EMAIL_USER,
    subject: `Action Required: Your ${applianceName} Service Request is Being Reviewed`,
    text: `Hello ${name},\n\nWe have received your request regarding your ${applianceName}. Our lead technician is currently reviewing your diagnostics.\n\nYou can expect a call at ${phone} within 60 minutes to confirm your appointment time.\n\nWhat's Next?\n1. Diagnostic Review\n2. Dispatch\n3. On-site Repair\n\nBest regards,\nAero Tech Solutions\nLicensed & Insured\nReference ID: ${reference}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Service Request Received</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.5;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.5;">We have received your request regarding your <strong>${applianceName}</strong>. Our lead technician is currently reviewing your diagnostics.</p>
          <p style="font-size: 16px; line-height: 1.5; background-color: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; border-radius: 4px;">
            You can expect a call at <strong>${phone}</strong> within 60 minutes to confirm your appointment time.
          </p>
          
          <h3 style="color: #0f172a; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 10px;">What's Next?</h3>
          <ol style="font-size: 16px; line-height: 1.6; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Diagnostic Review:</strong> Our team analyzes the issue description to prepare the necessary parts.</li>
            <li style="margin-bottom: 10px;"><strong>Dispatch:</strong> A certified technician is assigned to your location.</li>
            <li style="margin-bottom: 10px;"><strong>On-site Repair:</strong> We arrive fully equipped to restore your appliance.</li>
          </ol>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666;">
            <p style="margin: 0 0 5px;">Best regards,</p>
            <p style="margin: 0 0 5px; font-weight: bold; color: #0f172a;">Aero Tech Solutions</p>
            <p style="margin: 0;">Licensed & Insured</p>
            <p style="margin: 5px 0 0;">Reference ID: ${reference}</p>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
          &copy; ${new Date().getFullYear()} Aero Tech Solutions. All rights reserved.
        </div>
      </div>
    `
  };

  try {
    // Send Admin Notification
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('✅ Booking: Admin notification sent. ID:', adminInfo.messageId);

    // Send Customer Auto-Responder
    const customerInfo = await transporter.sendMail(customerMailOptions);
    console.log(`✅ Booking: Auto-responder sent to ${email}. ID:`, customerInfo.messageId);

    res.status(200).json({ success: true, reference });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to process booking. Check server logs.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});