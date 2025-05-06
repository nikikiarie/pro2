const Order = require('../models/Order')

const router = require('express').Router()




import express from 'express';
import Order from '../models/Order.js';




// Create new order (before payment)
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount , userId} = req.body;
    
    // Create pending order
    const order = new Order({
      user: userId,
      items,
      totalAmount,
      status: 'pending'
    });

    const createdOrder = await order.save();

    // Clear user's cart
    // await Cart.findOneAndUpdate(
      // { user: req.user._id },
      //{ $set: { items: [] } }
    // );

    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ 
      message: 'Order creation failed',
      error: error.message 
    });
  }
});







router.get("/",  async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });




router.get('/income',async(req,res)=>{
const date = new Date()
const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

try {
    
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
         
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$subTotal",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
   
})



module.exports = router
