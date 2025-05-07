import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes, FaMobileAlt } from "react-icons/fa";

import { decreaseProductAmount, increaseProductAmount } from "../redux/cartSlice";
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";
import { publicRequest } from "../makeRequest";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.user?.user?.accessToken);
  const location = useLocation();
  const dispatch = useDispatch();

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [success, setSuccess] = useState(false);
  // const [isPolling, setIsPolling] = useState(false);
  // const [currentOrderId, setCurrentOrderId] = useState(null);

  // // Polling for payment status
  // useEffect(() => {
  //   let intervalId;
    
  //   if (isPolling && currentOrderId) {
  //     intervalId = setInterval(() => {
  //       checkPaymentStatus(currentOrderId);
  //     }, 5000); // Check every 5 seconds
  //   }

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [isPolling, currentOrderId]);

  // const checkPaymentStatus = async (orderId) => {
  //   try {
  //     const response = await publicRequest.get(`/api/orders/${orderId}/status`);
      
  //     if (response.data.status === 'paid') {
  //       toast.success(`Payment confirmed! Receipt: ${response.data.mpesaReceipt}`);
  //       setIsPolling(false);
  //       setShowPaymentModal(false);
  //       // navigate(`/order-success/${orderId}`);
  //     }
  //   } catch (err) {
  //     console.error('Status check failed:', err);
  //   }
  // };

  const handleCheckoutClick = () => {
    if (!user) {
      navigate("/login", { state: location });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (paymentMethod === 'mpesa') {
      // Validate phone number
      if (!phoneNumber.match(/^(0|7|254)\d{8,9}$/)) {
        setPaymentError('Please enter a valid Kenyan phone number');
        return;
      }
      setPaymentError('');
      
      setIsProcessing(true);
      
      try {
        // 1. Create order
        const orderRes = await publicRequest.post("/api/orders", {
          userId: user._id,
          items: cart.products.map(item => ({
            productId: item._id.toString(),
            title: item.title,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: cart.amount
        });
        
        // 2. Initiate payment
        const res = await publicRequest.post(
          "/api/initiatepayment",
          {
            phone: phoneNumber,
            amount: cart.amount,
            orderId: orderRes.data._id
          },
          { headers: { token: `Bearer ${token}` } }
        );
        console.log("Payment response from initate payment:", res.data);
        if (res.data.ResponseCode === "0") {
          toast.success('Payment initiated! Please check your phone...');
          // setCurrentOrderId(orderRes.data._id);
          // setIsPolling(true);
          setShowPaymentModal(false);
        } else {
          setPaymentError(res.data.message || 'Failed to initiate payment');
        }
      } catch (err) {
        console.error(err);
        setPaymentError(err.response?.data?.message || 'Payment failed. Please try again.');
      } finally {
        setIsProcessing(false);
        setTimeout(() => {
          toast.success('Payment confirmed! Your order is being processed', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          
          // Optional: Navigate to success page after toast
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }, 15000);
      }
    } else {
      // Handle card payment
      try {
        const res = await publicRequest.post(
          "/api/checkout/payment",
          {
            cartItems: cart.products,
            userId: user._id,
          },
          { headers: { token: `Bearer ${token}` } }
        );
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (err) {
        console.log(err);
        setPaymentError('Card payment failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Announcement />
      <div className="p-5 max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">YOUR BAG</h1>
        
        {/* Top Section */}
        <div className="flex items-center justify-between px-2 my-8">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black border border-gray-300 hover:border-black px-6 py-2 text-sm font-medium transition-all duration-200"
          >
            CONTINUE SHOPPING
          </button>

          <div className="hidden md:flex space-x-4">
            <span className="text-gray-600 hover:text-black cursor-pointer">Shopping Bag ({cart.quantity})</span>
            <span className="text-gray-400 cursor-not-allowed">Your Wishlist (0)</span>
          </div>

          <button 
            onClick={handleCheckoutClick}
            className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-all duration-200"
          >
            CHECKOUT NOW
          </button>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Info */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
            {cart.products.map((item) => (
              <React.Fragment key={item._id}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6">
                  {/* Product Details */}
                  <div className="flex flex-col sm:flex-row gap-6 flex-1">
                    <img
                      src={
                        item?.img ||
                        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"
                      }
                      alt="product"
                      className="w-32 h-32 object-contain rounded"
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <span className="font-medium text-lg">
                        <b className="font-semibold">Product: </b>
                        {item?.title}
                      </span>
                      <span className="text-gray-600 text-sm">
                        <b className="font-semibold">ID: </b>
                        {item?._id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          <b className="font-semibold">Color: </b>
                        </span>
                        <div
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: item?.color }}
                        />
                      </div>
                      <span className="text-gray-600">
                        <b className="font-semibold">Size: </b> {item?.size}
                      </span>
                    </div>
                  </div>

                  {/* Price Details */}
                  <div className="flex flex-col items-end sm:items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center justify-center">
                      <FaMinus 
                        onClick={() => dispatch(decreaseProductAmount({ ...item }))} 
                        className="cursor-pointer text-gray-500 hover:text-black p-1"
                      />
                      <span className="border border-gray-300 px-3 py-1 rounded mx-2 w-12 text-center">
                        {item?.quantity}
                      </span>
                      <FaPlus 
                        onClick={() => dispatch(increaseProductAmount({ ...item }))} 
                        className="cursor-pointer text-gray-500 hover:text-black p-1"
                      />
                    </div>
                    <span className="text-xl font-medium">
                      ${(item?.price * item?.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <hr className="border-t border-gray-200" />
              </React.Fragment>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 bg-white border border-gray-200 rounded-lg shadow-sm p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">ORDER SUMMARY</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$ {cart.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Shipping</span>
                <span className="font-medium">$ 5.90</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping Discount</span>
                <span className="font-medium text-green-600">$ -5.90</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8 py-4 border-t border-b border-gray-200">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold">$ {cart.amount.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="bg-black text-white py-3 w-full font-medium hover:bg-gray-800 transition-all duration-200 rounded"
            >
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">Complete Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold">KSh {cart.amount.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Complete your purchase by entering your payment details
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">PAYMENT METHOD</h4>
                <div className="space-y-3">
                  <div 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('mpesa')}
                  >
                    <div className="mr-3 p-2 bg-blue-100 rounded-full">
                      <FaMobileAlt className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm text-gray-500">Pay via M-Pesa STK Push</div>
                    </div>
                    <div className="ml-auto">
                      <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="mr-3 p-2 bg-purple-100 rounded-full">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</div>
                    </div>
                    <div className="ml-auto">
                      <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'mpesa' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 07XX XXX XXX"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Enter your M-Pesa registered phone number
                  </div>
                  {paymentError && (
                    <div className="text-red-500 text-sm mt-2">{paymentError}</div>
                  )}
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <div className="text-center py-8 text-gray-400">
                    Card payment will be processed on the next screen
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === 'mpesa' && !phoneNumber)}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay KSh ${cart.amount.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;