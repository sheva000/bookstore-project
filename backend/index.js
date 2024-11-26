const express = require("express");
const app = express();
const cors = require('cors')
const getBaseUrl = () => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
  console.log(baseUrl);
  return baseUrl+":5000"
}


const mongoose = require("mongoose");
require('dotenv').config()
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors({
  origin: [getBaseUrl],
  credentials: true
}))

//Routes
const bookRoutes = require('./src/books/bookRoutes')
const orderRoutes = require('./src/orders/orderRoute')
const userRoutes = require('./src/users/userRoute')
const adminRoutes = require('./src/stats/adminStats')

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Welcome");
  });
}

main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
