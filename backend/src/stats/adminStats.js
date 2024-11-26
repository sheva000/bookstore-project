const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/orderModel");
const Book = require("../books/bookModel");
const router = express.Router();

// Function to calculate admin stats
router.get("/", async (req, res) => {
  try {
    //Total number of orders
    const totalOrders = await Order.countDocuments();

    // Total sales (sum of all totalPrice from orders)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSales: { $round: ["$totalSales", 4] }, // Round totalSales to 3 decimal places
        },
      },
    ]);

    //Trending books statistics:
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } }, // Match only trending books
      { $count: "trendingBooksCount" }, // Return the count of trending books
    ]);

    //Just the count (as a number)
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    //Total number of books
    const totalBooks = await Book.countDocuments();

    //Percentage of trending books
    const trendingBooksPercentage =
      totalBooks > 0 ? ((trendingBooks / totalBooks) * 100).toFixed(2) : 0;

    //Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
          totalSales: { $sum: "$totalPrice" }, // Sum totalPrice for each month
          totalOrders: { $sum: 1 }, // Count total orders for each month
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Result summary
    res
      .status(200)
      .json({
        totalOrders,
        totalSales: totalSales[0]?.totalSales || 0,
        trendingBooks,
        totalBooks,
        trendingBooksPercentage,
        monthlySales,
      });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
