"use server";

import nodemailer from "nodemailer";

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  fromEmail?: string; // Optional parameter for authenticated user's email
}

export async function sendContactEmail(data: EmailData) {
  try {
    // Validate input data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      };
    }

    // Validate environment variables
    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_PASS,
      EMAIL_FROM,
      EMAIL_TO,
    } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM || !EMAIL_TO) {
      return {
        success: false,
        message: "Email service not configured properly. Please contact administrator.",
      };
    }

    // Use authenticated user's email as reply-to, but keep system email as from
    // This is important for email deliverability - many servers reject emails with unauthorized "from" addresses
    const fromAddress = data.fromEmail && emailRegex.test(data.fromEmail) 
      ? data.fromEmail 
      : data.email;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Verify transporter
    await transporter.verify();

    // Define email content
    const mailOptions = {
      from: EMAIL_FROM, // System email (authorized sender)
      to: EMAIL_TO,
      replyTo: fromAddress, // User's email for replies
      subject: `Contact Form: ${data.subject}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        
        Message:
        ${data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br />")}</p>
        ${data.fromEmail ? `<p><small>User submitted this form while logged in as: ${data.fromEmail}</small></p>` : ''}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Your message has been sent successfully!",
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send your message. Please try again later.",
    };
  }
}