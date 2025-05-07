const express = require("express");
const router = express.Router();
const Order = require('../models/Order')
const { initiateSTKPush } = require("../utils/mpesa");

router.post('/initiatepayment', async (req, res) => {
  try {
    const { phone, amount, orderId} = req.body;
    console.log("Phone", phone)

    const order = await Order.findById(orderId)
    const response = await initiateSTKPush(phone, amount);
    console.log('STK Push Response:', response);
    console.log("Order ID", order.userId)

    order.checkoutRequestId = response.CheckoutRequestID;
    await order.save();
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});


router.post('/callback', (req, res) => {
    const callbackData = req.body;

    
   // 1. First show me EVERYTHING as-is
    console.log("COMPLETE CALLBACK DATA:\n", JSON.stringify(callbackData, null, 2));
    
   // 2. Then show just the metadata structure
    if (callbackData?.Body?.stkCallback?.CallbackMetadata) {
        const meta = callbackData.Body.stkCallback.CallbackMetadata;
        console.log("\nMETADATA STRUCTURE:\n", JSON.stringify(meta, null, 2));
    } else {
        console.log("\nNo metadata found");
    }

  
//   const checkoutId = callbackData?.Body?.stkCallback?.CheckoutRequestID
//   try {
//     const order = await Order.findOne({ checkoutRequestId: checkoutId });
    
    
//     if (!order) {
//         console.log("Order not found for checkoutId:", checkoutId);
//     } else {
//         console.log("Found order:", order);
//         // Do something with the order...
//     }
//    const callbackMetadata = callbackData?.Body?.stkCallback?.CallbackMetadata?.Item || [];
//         const paymentData = {
//             amount: callbackMetadata.find(item => item.Name === "Amount")?.Value,
//             mpesaReceipt: callbackMetadata.find(item => item.Name === "MpesaReceiptNumber")?.Value,
//             phoneNumber: callbackMetadata.find(item => item.Name === "PhoneNumber")?.Value?.toString(), // Convert to string
//             transactionDate: callbackMetadata.find(item => item.Name === "TransactionDate")?.Value
//         };

//         // 3. Update the order
//     console.log("paymentData",paymentData)
//         order.status = 'paid'; // Mark as paid
//         order.mpesaReceipt = paymentData.mpesaReceipt; // Save receipt number
//         order.phoneNumber = paymentData.phoneNumber; // Save phone number

//         await order.save(); // Save changes to DB

//         console.log("Order updated successfully:", order);
//   } catch (err) {
//     console.error("Error finding order:", err);
// }
    
    // res.status(200).end();

    // res.json({
    //   "ResultCode": 0,
    //   "ResultDesc": "Success"
    // });
    // res.json({
    //   message: 'Callback Received Successfully',
    //   success: true
    //   });
    res.json("success" );
  });





// app.use(express.json()); // For parsing application/json
// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// // Enhanced callback handler
// router.post('/callback', async (req, res) => {
//   try {
//     // Log full request info for debugging
//     console.log('=== Received M-Pesa Callback ===');
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('Query Params:', req.query);
    
//     if (!req.body || Object.keys(req.body).length === 0) {
//       console.error('Empty callback body received');
//       return res.status(400).json({ 
//         ResultCode: 1, 
//         ResultDesc: "Empty callback body" 
//       });
//     }

//     const callbackData = req.body;
    
//     // Validate basic callback structure
//     if (!callbackData.hasOwnProperty('ResultCode')) {
//       console.error('Invalid callback format:', callbackData);
//       return res.status(400).json({
//         ResultCode: 1,
//         ResultDesc: "Invalid callback format"
//       });
//     }

//     // Process the callback data
//     if (callbackData.ResultCode == 0) { // Note: M-Pesa sends this as string sometimes
//       console.log('Payment successful:', callbackData);
      
//       // Extract relevant data
//       const merchantRequestID = callbackData.MerchantRequestID;
//       const checkoutRequestID = callbackData.CheckoutRequestID;
//       const mpesaReceiptNumber = callbackData.MpesaReceiptNumber;
      
//       // Find and update payment in database
//       const payment = await Payment.findOneAndUpdate(
//         { 
//           $or: [
//             { merchantRequestID },
//             { checkoutRequestID }
//           ]
//         },
//         {
//           status: 'completed',
//           mpesaReceiptNumber,
//           transactionDate: new Date(),
//           callbackData: callbackData // Store full callback for reference
//         },
//         { new: true }
//       );
      
//       if (!payment) {
//         console.error('Payment record not found for:', { merchantRequestID, checkoutRequestID });
//       } else {
//         console.log('Updated payment:', payment._id);
//       }
//     } else {
//       console.log('Payment failed:', callbackData);
      
//       // Update failed payment
//       await Payment.findOneAndUpdate(
//         {
//           $or: [
//             { merchantRequestID: callbackData.MerchantRequestID },
//             { checkoutRequestID: callbackData.CheckoutRequestID }
//           ]
//         },
//         {
//           status: 'failed',
//           errorMessage: callbackData.ResultDesc,
//           callbackData: callbackData
//         }
//       );
//     }

//     // Always respond with success to M-Pesa
//     res.status(200).json({ 
//       ResultCode: 0, 
//       ResultDesc: "Callback processed successfully" 
//     });
    
//   } catch (error) {
//     console.error('Callback processing error:', error);
//     res.status(200).json({ 
//       ResultCode: 1, 
//       ResultDesc: "Error processing callback" 
//     });
//   }
// });

module.exports = router;
