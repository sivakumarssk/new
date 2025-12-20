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

// Download purchases as Excel (only successful payments)
exports.downloadPurchasesExcel = async (req, res) => {
  try {
    // Only fetch purchases with completed payment status
    const purchases = await Purchase.find({ paymentStatus: 'completed' }).sort({ createdAt: -1 })

    if (purchases.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No successful payments found',
      })
    }

    // Prepare data for Excel
    const excelData = purchases.map((purchase) => ({
      'Order ID': purchase.orderId,
      'Payment ID': purchase.razorpayPaymentId,
      'Customer Name': purchase.customerName,
      'Customer Email': purchase.customerEmail,
      'Customer Phone': purchase.customerPhone,
      'Ticket Category': purchase.ticketName,
      'Ticket Type': purchase.ticketType,
      'Quantity': purchase.quantity || 1,
      'Number of Seats': purchase.ticketSeats,
      'Price Per Ticket': purchase.earlyBirdPrice || purchase.ticketPrice,
      'Tax Amount': purchase.taxAmount,
      'Total Amount': purchase.totalAmount,
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
      { wch: 10 }, // Quantity
      { wch: 15 }, // Number of Seats
      { wch: 15 }, // Price Per Ticket
      { wch: 12 }, // Tax Amount
      { wch: 12 }, // Total Amount
      { wch: 12 }, // Email Sent
      { wch: 25 }, // Purchase Date
    ]
    worksheet['!cols'] = columnWidths

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Purchases')

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Set headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename=successful_purchases_${Date.now()}.xlsx`)

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

