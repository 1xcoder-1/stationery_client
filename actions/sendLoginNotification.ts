"use server";

import nodemailer from "nodemailer";

interface LoginNotificationData {
  userId: string;
  name: string;
  email: string;
  loginTime: Date;
  ipAddress?: string;
  userAgent?: string;
}

export async function sendLoginNotification(data: LoginNotificationData) {
  try {
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
      console.error("Email service not configured properly");
      return {
        success: false,
        message: "Email service not configured properly.",
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT),
      secure: parseInt(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Verify transporter
    await transporter.verify();

    // Determine email provider icon
    let providerIcon = "";
    let providerName = "Unknown Provider";
    
    if (data.email.includes("@gmail.com")) {
      providerIcon = " Gmail";
      providerName = "Google";
    } else if (data.email.includes("@yahoo.")) {
      providerIcon = " Yahoo";
      providerName = "Yahoo";
    } else if (data.email.includes("@outlook.") || data.email.includes("@hotmail.")) {
      providerIcon = " Microsoft";
      providerName = "Microsoft";
    } else if (data.email.includes("@icloud.com")) {
      providerIcon = " Apple";
      providerName = "Apple";
    } else {
      providerIcon = " Email";
      providerName = "Email Provider";
    }

    // Check if it's your own email (me)
    const isOwnEmail = data.email === EMAIL_TO;

    // Format login time
    const formattedTime = new Date(data.loginTime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Define email content with professional formatting
    const mailOptions = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New Login Notification${isOwnEmail ? " (me)" : ""} - ${data.name}`,
      text: `
Login Alert${isOwnEmail ? " (me)" : ""}

User Details:
Name: ${data.name}${isOwnEmail ? " (me)" : ""}
Email: ${data.email}
Provider: ${providerName}
Login Time: ${formattedTime}

Additional Information:
IP Address: ${data.ipAddress || "Not available"}
User Agent: ${data.userAgent || "Not available"}

This is an automated notification from your Doodle Blast e-commerce platform.
`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Notification</title>
  <style>
    body {
      font-family: 'Roboto', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
    }
    .user-info {
      background-color: #f8f9fa;
      border-left: 4px solid #1e1e1e;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .info-row {
      margin: 10px 0;
    }
    .info-label {
      font-weight: bold;
      color: #1e1e1e;
      display: inline-block;
      width: 120px;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      background-color: #1e1e1e;
      color: white;
      margin-left: 10px;
    }
    .footer {
      background-color: #f0f0f0;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .provider-icon {
      display: inline-block;
      margin-right: 8px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Login Alert${isOwnEmail ? " <span class='badge'>me</span>" : ""}</h1>
    </div>
    
    <div class="content">
      <p>Hello,</p>
      
      <p>A user has logged into your Doodle Blast e-commerce platform:</p>
      
      <div class="user-info">
        <div class="info-row">
          <span class="info-label">Name:</span> 
          ${data.name}${isOwnEmail ? " <span class='badge'>me</span>" : ""}
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span> 
          ${data.email}
        </div>
        <div class="info-row">
          <span class="info-label">Provider:</span> 
          <span class="provider-icon">${providerIcon}</span> ${providerName}
        </div>
        <div class="info-row">
          <span class="info-label">Login Time:</span> 
          ${formattedTime}
        </div>
      </div>
      
      <h3>Additional Information:</h3>
      <div class="info-row"><span class="info-label">IP Address:</span> ${data.ipAddress || "Not available"}</div>
      <div class="info-row"><span class="info-label">User Agent:</span> ${data.userAgent || "Not available"}</div>
      
      <p>This is an automated notification from your Doodle Blast e-commerce platform.</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Doodle Blast. All rights reserved.</p>
      <p>This email was sent because someone logged into your account.</p>
    </div>
  </div>
</body>
</html>
`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Login notification sent successfully!",
    };
  } catch (error: any) {
    console.error("Error sending login notification:", error);
    return {
      success: false,
      message: "Failed to send login notification.",
    };
  }
}