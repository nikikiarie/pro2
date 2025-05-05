const express = require("express");
const router = express.Router();
const { initiateSTKPush } = require("../utils/mpesa");

router.post('/initiatepayment', async (req, res) => {
  try {
    const { phone, amount} = req.body;
    const response = await initiateSTKPush(phone, amount);
    console.log('STK Push Response:', response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});


router.post('/callback', (req, res) => {
    const callbackData = req.body;
    console.log("callbackData", callbackData);
    // console.log(callbackData.Body);
    // Process the callback data
    // if (callbackData.ResultCode === 0) {
    //   // Payment was successful
    //   // Update your database, send confirmation email, etc.
    //   console.log('Payment successful:', callbackData);
    // } else {
    //   // Payment failed
    //   console.log('Payment failed:', callbackData);
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
    res.json({ status: 'success' });
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