const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your_email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_email_password_here',
  },
})

const sendInvoiceEmail = async (purchase) => {
  const venueDetails = `
    <h2>Event Venue Details</h2>
    <p><strong>Location:</strong> Check the map on our Contact Us page</p>
    <p><strong>Date:</strong> December 31, 2024</p>
    <p><strong>Time:</strong> 8:00 PM onwards</p>
    <p><strong>Address:</strong> As per Google Maps location</p>
  `

  const foodDetails = purchase.ticketType === 'VVIP' 
    ? `
      <h3>Unlimited Buffet Includes:</h3>
      <ul>
        <li>2 Non-Veg Starters</li>
        <li>1 Veg Starter</li>
        <li>Prawn Biriyani</li>
        <li>Chicken Curry</li>
        <li>Chicken Fry</li>
        <li>Veg Curry</li>
        <li>Bagar Rice</li>
        <li>Bisebellebath</li>
        <li>Curd Rice</li>
      </ul>
    `
    : purchase.ticketType === 'VIP'
    ? `
      <h3>Unlimited Buffet Includes:</h3>
      <ul>
        <li>1 Non-Veg Starter</li>
        <li>1 Veg Starter</li>
        <li>Prawn Biriyani</li>
        <li>Chicken Curry</li>
        <li>Chicken Fry</li>
        <li>Veg Curry</li>
        <li>Bagar Rice</li>
        <li>Bisebellebath</li>
        <li>Curd Rice</li>
      </ul>
    `
    : '<p>No food included. Food stalls will be available at the event.</p>'

  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to: purchase.customerEmail,
    subject: `🎉 Sky Events New Year Bash - Ticket Confirmation`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .ticket-info { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Sky Events New Year Bash</h1>
            <p>Your Ticket Confirmation</p>
          </div>
          <div class="content">
            <h2>Dear ${purchase.customerName},</h2>
            <p>Thank you for your purchase! Your ticket has been confirmed.</p>
            
            <div class="ticket-info">
              <h3>Ticket Details:</h3>
              <p><strong>Ticket Category:</strong> ${purchase.ticketName}</p>
              <p><strong>Ticket Type:</strong> ${purchase.ticketType}</p>
              <p><strong>Number of Seats:</strong> ${purchase.ticketSeats}</p>
              <p><strong>Amount Paid:</strong> ₹${purchase.totalAmount.toLocaleString()}</p>
              <p><strong>Order ID:</strong> ${purchase.orderId}</p>
              <p><strong>Payment ID:</strong> ${purchase.razorpayPaymentId}</p>
            </div>

            ${foodDetails}

            ${venueDetails}

            <div class="footer">
              <p>We look forward to celebrating with you!</p>
              <p><strong>Sky Events Team</strong></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

module.exports = { sendInvoiceEmail }

