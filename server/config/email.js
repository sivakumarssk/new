const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Package image mapping - maps ticket categories to image filenames
const PACKAGE_IMAGES = {
  'standard-1': 'standard.jpg',
  'fanpit-1': 'fanpit.png',
  'vip-1': 'vip.jpg',
  'vip-family': 'vip4pax.png',
  'vvip-couple': 'vvipcouple.png',
  'vvip-family': 'vvipfamily.jpg',
}

// Package features mapping
const PACKAGE_FEATURES = {
  'Standard': ['Fireworks Show', 'Live Music'],
  'Fanpit': ['Fireworks Show', 'Live Music'],
  'VIP': ['Fireworks Show', 'Live Music', 'Food'],
  'VVIP': ['Fireworks Show', 'Live Music', 'Food'],
}

// Food details mapping
const FOOD_DETAILS = {
  'VVIP': {
    title: 'Unlimited Buffet Included',
    items: [
      '2 Non-Veg Starters',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'VIP': {
    title: 'Unlimited Buffet Included',
    items: [
      '2 Non-Veg Starter',
      '1 Veg Starter',
      'Prawn Biriyani',
      'Chicken Curry',
      'Chicken Fry',
      'Veg Curry',
      'Bagar Rice',
      'Bisebellebath',
      'Curd Rice',
    ]
  },
  'Fanpit': {
    title: 'Limited Food Included',
    items: [
      '1 Non-Veg Starter',
    ]
  },
  'Standard': {
    title: 'Food Information',
    items: [
      'No food included with ticket',
      'Food stalls will be available at the event',
      'You may conveniently purchase meals and refreshments',
    ]
  }
}

// Get image file path for attachment
const getImagePath = (imageFilename) => {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      path.join(__dirname, '../../client/src/assets', imageFilename), // server/config -> root/client/src/assets
      path.join(__dirname, '../../../client/src/assets', imageFilename), // server/config -> parent/root/client/src/assets
      path.join(process.cwd(), 'client/src/assets', imageFilename), // From project root
    ]
    
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        console.log('✅ Found image at:', testPath)
        return testPath
      }
    }
    console.log('❌ Image file not found. Tried paths:', possiblePaths)
  } catch (error) {
    console.error('❌ Error finding image:', error.message)
  }
  return null
}

const sendInvoiceEmail = async (purchase) => {
  try {
    console.log('📧 Preparing email for purchase:', purchase.ticketCategory, purchase.customerEmail)
    
    // Get package image - use CID attachment
    const imageFilename = PACKAGE_IMAGES[purchase.ticketCategory] || 'standard.jpg'
    const packageName = purchase.ticketName || 'Ticket'
    const imageCid = 'package-image-' + Date.now()
    let imageTag = `<table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; margin: 20px 0;">
      <tr>
        <td align="center" style="padding: 40px 20px; color: #ffffff;">
          <div style="font-size: 48px; margin-bottom: 10px;">🎫</div>
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">${packageName}</div>
          <div style="font-size: 16px; opacity: 0.9;">Package Image</div>
        </td>
      </tr>
    </table>`
    
    // Prepare image attachment
    const attachments = []
    const imagePath = getImagePath(imageFilename)
    if (imagePath) {
      try {
        attachments.push({
          filename: imageFilename,
          path: imagePath,
          cid: imageCid
        })
        console.log('✅ Package image attached:', imageFilename)
        imageTag = `<table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0">
<tr>
<td align="center">
<img src="cid:${imageCid}" alt="${packageName}" style="max-width:500px;width:100%;height:auto;border-radius:10px;display:block" />
</td>
</tr>
</table>`
      } catch (imageError) {
        console.log('⚠️ Image attachment error, using placeholder:', imageError.message)
      }
    } else {
      console.log('⚠️ Image not found, using placeholder:', imageFilename)
    }

    // Get package features
    const features = PACKAGE_FEATURES[purchase.ticketType] || []
    const featuresList = features.length > 0 
      ? features.map(feature => `<li style="margin: 8px 0;">✓ ${feature}</li>`).join('')
      : '<li style="margin: 8px 0;">Event Access</li>'

    // Get food details
    const foodInfo = FOOD_DETAILS[purchase.ticketType] || FOOD_DETAILS['Standard']
    const foodItems = foodInfo.items.map(item => `<li style="margin: 8px 0;">• ${item}</li>`).join('')

  // Venue details
  const venueDetails = `
    <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <h3 style="color: #1f2937; margin-top: 0;">📍 Event Venue Details</h3>
      <p style="margin: 8px 0;"><strong>Date:</strong> 31st December 2025</p>
      <p style="margin: 8px 0;"><strong>Time:</strong> Night Event</p>
      <p style="margin: 8px 0;"><strong>Location:</strong> 2R43+V75 Rajamahendravaram, Andhra Pradesh</p>
      <p style="margin: 8px 0;"><strong>Address:</strong> 114-2-631/1, Sy No 165 & 166, Krishna Nagar, Rajanagaram Road, Swagat Petrol Bunk, Diwancheruvu, Rajamahendravaram</p>
    </div>
  `

    // Calculate pricing breakdown
    const quantity = purchase.quantity || 1
    const pricePerTicket = purchase.ticketPrice || 0
    const basePrice = pricePerTicket * quantity
    const tax = purchase.taxAmount || 0
    const total = purchase.totalAmount || 0

    // Ensure all values are safe for template
    const safeTicketName = (purchase.ticketName || 'Standard').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeTicketType = (purchase.ticketType || 'Standard').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeCustomerName = (purchase.customerName || 'Customer').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeOrderId = (purchase.orderId || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safePaymentId = (purchase.razorpayPaymentId || 'N/A').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeTicketSeats = purchase.ticketSeats || 1
    const safeQuantity = purchase.quantity || 1

    console.log('📧 Email template variables prepared successfully')

    // Build email HTML - optimized to prevent Gmail clipping
    const emailHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f3f4f6">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px 0">
<tr>
<td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;max-width:600px">
<tr>
<td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 30px;text-align:center">
<h1 style="margin:0 0 10px 0;font-size:28px;color:#ffffff">🎉 SKY DRIVE INN</h1>
<h2 style="margin:10px 0 0 0;font-size:24px;color:#ffffff">Sky Events New Year Bash</h2>
<p style="margin:10px 0 0 0;font-size:16px;color:#ffffff">Your Ticket Confirmation</p>
</td>
</tr>
<tr>
<td style="padding:30px">
<p style="font-size:18px;color:#1f2937;margin:0 0 20px 0"><strong>Dear ${safeCustomerName},</strong></p>
<p style="font-size:16px;color:#4b5563;margin:0 0 25px 0">Thank you for your purchase! Your ticket has been confirmed. We're excited to celebrate with you!</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0">
<tr>
<td align="center">
${imageTag}
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%);border:2px solid #3b82f6;border-radius:10px;margin:25px 0">
<tr>
<td style="padding:25px">
<h3 style="margin:0 0 20px 0;font-size:20px;color:#1e40af">🎫 Package Details</h3>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Package Name:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeTicketName}</td>
</tr>
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Package Type:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeTicketType}</td>
</tr>
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Quantity:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeQuantity}</td>
</tr>
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Number of Seats per Ticket:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeTicketSeats}</td>
</tr>
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Total Seats:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeQuantity * safeTicketSeats}</td>
</tr>
<tr>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe"><strong style="color:#1e40af">Order ID:</strong></td>
<td style="padding:10px 0;border-bottom:1px solid #dbeafe;text-align:right;color:#1f2937">${safeOrderId}</td>
</tr>
<tr>
<td style="padding:10px 0"><strong style="color:#1e40af">Payment ID:</strong></td>
<td style="padding:10px 0;text-align:right;color:#1f2937">${safePaymentId}</td>
</tr>
</table>
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-left:4px solid #10b981;border-radius:8px;margin:20px 0">
<tr>
<td style="padding:20px">
<h3 style="margin:0 0 15px 0;font-size:18px;color:#059669">✨ What's Included</h3>
<ul style="margin:10px 0;padding-left:20px;list-style:none">
${featuresList}
</ul>
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-left:4px solid #f59e0b;border-radius:8px;margin:20px 0">
<tr>
<td style="padding:20px">
<h3 style="margin:0 0 15px 0;font-size:18px;color:#d97706">🍽️ ${foodInfo.title}</h3>
<ul style="margin:10px 0;padding-left:20px;list-style:none">
${foodItems}
</ul>
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3c7;border:2px solid #fbbf24;border-radius:8px;margin:20px 0">
<tr>
<td style="padding:20px">
<h3 style="margin:0 0 15px 0;font-size:18px;color:#92400e">💰 Payment Details</h3>
<table width="100%" cellpadding="0" cellspacing="0">
${quantity > 1 ? `<tr>
<td style="padding:8px 0;color:#92400e">Price per Ticket:</td>
<td style="padding:8px 0;text-align:right;color:#92400e">₹${pricePerTicket.toLocaleString()}</td>
</tr>
<tr>
<td style="padding:8px 0;color:#92400e">Quantity:</td>
<td style="padding:8px 0;text-align:right;color:#92400e">${quantity}</td>
</tr>
<tr>
<td style="padding:8px 0;color:#92400e">Subtotal:</td>
<td style="padding:8px 0;text-align:right;color:#92400e">₹${basePrice.toLocaleString()}</td>
</tr>` : `<tr>
<td style="padding:8px 0;color:#92400e">Package Price:</td>
<td style="padding:8px 0;text-align:right;color:#92400e">₹${basePrice.toLocaleString()}</td>
</tr>`}
<tr>
<td style="padding:8px 0;color:#92400e">Tax (5%):</td>
<td style="padding:8px 0;text-align:right;color:#92400e">₹${tax.toLocaleString()}</td>
</tr>
<tr>
<td style="padding:15px 0 8px 0;border-top:2px solid #fbbf24;font-weight:bold;font-size:18px;color:#92400e">Total Amount Paid:</td>
<td style="padding:15px 0 8px 0;border-top:2px solid #fbbf24;text-align:right;font-weight:bold;font-size:18px;color:#92400e">₹${total.toLocaleString()}</td>
</tr>
</table>
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-left:4px solid #f59e0b;border-radius:8px;margin:20px 0">
<tr>
<td style="padding:20px">
<h3 style="margin:0 0 15px 0;font-size:18px;color:#1f2937">📍 Event Venue Details</h3>
<p style="margin:8px 0;color:#1f2937"><strong>Date:</strong> 31st December 2025</p>
<p style="margin:8px 0;color:#1f2937"><strong>Time:</strong> Night Event</p>
<p style="margin:8px 0;color:#1f2937"><strong>Location:</strong> 2R43+V75 Rajamahendravaram, Andhra Pradesh</p>
<p style="margin:8px 0;color:#1f2937"><strong>Address:</strong> 114-2-631/1, Sy No 165 & 166, Krishna Nagar, Rajanagaram Road, Swagat Petrol Bunk, Diwancheruvu, Rajamahendravaram</p>
<p style="margin:15px 0 8px 0"><a href="https://www.google.com/maps?q=17.0071389,81.8032222&hl=en" target="_blank" style="display:inline-block;background-color:#4285f4;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:5px;font-weight:bold;font-size:14px">📍 View on Google Maps</a></p>
</td>
</tr>
</table>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#dbeafe;border-radius:8px;margin:20px 0">
<tr>
<td style="padding:20px;text-align:center">
<p style="margin:0;color:#1e40af;font-weight:600;font-size:16px">🎊 We look forward to celebrating with you on New Year's Eve! 🎊</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background-color:#f9fafb;padding:30px;text-align:center;border-radius:0 0 10px 10px">
<p style="margin:8px 0;color:#1f2937"><strong>SKY DRIVE INN</strong></p>
<p style="margin:8px 0;color:#1f2937"><strong>Sky Events Team</strong></p>
<p style="margin:8px 0;color:#6b7280;font-size:14px">For any queries, please contact us at +91 7799203333</p>
<p style="margin:8px 0;color:#6b7280;font-size:14px">Email: info@skyevents.com</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`

    const mailOptions = {
    from: process.env.EMAIL_USER || 'skynewyearbash@gmail.com',
    to: purchase.customerEmail,
    subject: `🎉 Sky Events New Year Bash - Ticket Confirmation`,
    html: emailHTML,
    attachments: attachments,
    }

    console.log('📧 Sending email...')
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('❌ Email sending failed:', error.message)
    console.error('Error details:', error)
    return false
  }
}

module.exports = { sendInvoiceEmail }

