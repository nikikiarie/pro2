// services/mpesaService.js
const axios = require('axios');
require('dotenv').config();

const getAuthToken = async () => {
  try {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get(process.env.MPESA_AUTH_URL, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

const initiateSTKPush = async (phone, amount) => {
  try {
    const token = await getAuthToken();
    
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3);
    const password = Buffer.from(
      `${process.env.MPESA_BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post(
      process.env.MPESA_STK_PUSH_URL,
      {
        BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
        PhoneNumber: `254${phone}`,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Test",
        // AccountReference: process.env.MPESA_REFERENCE,
        TransactionDesc: "Test"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error);
    throw error;
  }
};

module.exports = { initiateSTKPush };
