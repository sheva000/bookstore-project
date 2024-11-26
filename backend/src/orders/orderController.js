//Import the Order model
const Order = require('./orderModel')

//Controller to create a new order
const createOrder = async (req, res) => {
  try {
    //Create a new order instance using the request body
    const newOrder = await Order(req.body)

    //Save the new order to the DB
    const savedOrder = await newOrder.save();

    //Respond with the saved order details
    res.status(200).json(savedOrder)
  } catch (error) {
    //Log and handle errors during order creation
    console.error("Error creating order", error)
    res.status(500).json({message: "Failed to create order"})
  }
};

//Controller to fetch orders by email
const getOrderByEmail = async (req, res) => {
  try {
    //Extract email from route parameters
    const {email} = req.params

    //Fetch all orders for the given email, sorted by creation date (newest to oldest)
    const orders = await Order.find({email}).sort({createdAt: -1})

    //If no orders are found, respond with a 404 status
    if(!orders){
      return res.status(404).json({message: "Order not found"})
    }

    //Respond with the fetched orders
    res.status(200).json(orders)
  } catch (error) {
    //Log and handle any errors during fetched orders
    console.error("Error fetching order", error)
    res.status(500).json({message: "Failed to fetch order"})
  }
}

module.exports = {
  createOrder,
  getOrderByEmail
};
