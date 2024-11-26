const express = require('express')
const { createOrder, getOrderByEmail } = require('./orderController')

const router = express.Router()

//Create order
router.post("/", createOrder)

//GET orders
router.get("/email/:email", getOrderByEmail)

module.exports = router