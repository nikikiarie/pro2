const Order = require('../models/Order')

const router = require('express').Router()





router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    console.log("Orders route items",userId)
    
    const order = await Order.create({
      userId,
      items,
      totalAmount
    });
    console.log(order)

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
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

// Get payment status
// Get payment status
router.get('/:id/status', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ 
      status: order.status,
      receipt: order.mpesaReceipt
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router
