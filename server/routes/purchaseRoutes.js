const express = require('express')
const router = express.Router()
const purchaseController = require('../controllers/purchaseController')

router.get('/', purchaseController.getAllPurchases)
router.get('/download-excel', purchaseController.downloadPurchasesExcel)

module.exports = router

