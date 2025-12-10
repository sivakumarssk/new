const Purchase = require('../models/Purchase')
const XLSX = require('xlsx')

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases,
    })
  } catch (error) {
    console.error('Error fetching purchases:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching purchases',
      error: error.message,
    })
  }
}

// Download purchases as Excel
exports.downloadPurchasesExcel = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ createdAt: -1 })

    // Prepare data for Excel
    const excelData = purchases.map((purchase) => ({
      'Order ID': purchase.orderId,
      'Payment ID': purchase.razorpayPaymentId,
      'Customer Name': purchase.customerName,
      'Customer Email': purchase.customerEmail,
      'Customer Phone': purchase.customerPhone,
      'Ticket Category': purchase.ticketName,
      'Ticket Type': purchase.ticketType,
      'Number of Seats': purchase.ticketSeats,
      'Ticket Price': purchase.ticketPrice,
      'Total Amount': purchase.totalAmount,
      'Payment Status': purchase.paymentStatus,
      'Email Sent': purchase.emailSent ? 'Yes' : 'No',
      'Purchase Date': purchase.createdAt.toLocaleString('en-IN'),
    }))

    // Create workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Order ID
      { wch: 20 }, // Payment ID
      { wch: 20 }, // Customer Name
      { wch: 25 }, // Customer Email
      { wch: 15 }, // Customer Phone
      { wch: 15 }, // Ticket Category
      { wch: 10 }, // Ticket Type
      { wch: 15 }, // Number of Seats
      { wch: 12 }, // Ticket Price
      { wch: 12 }, // Total Amount
      { wch: 15 }, // Payment Status
      { wch: 12 }, // Email Sent
      { wch: 25 }, // Purchase Date
    ]
    worksheet['!cols'] = columnWidths

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases')

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Set headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename=purchases_${Date.now()}.xlsx`)

    res.send(buffer)
  } catch (error) {
    console.error('Error downloading Excel:', error)
    res.status(500).json({
      success: false,
      message: 'Error downloading Excel file',
      error: error.message,
    })
  }
}

