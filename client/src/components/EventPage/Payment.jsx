import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'; // withRouter for React Router v5

const PaymentPage = ({ location, history }) => {
  const { bookingData } = location.state.state || {}; // Safely access bookingData from location.state
  console.log('In the payment page', bookingData); // Debugging log

  // Default values if bookingData is not available
  const initialPrice = bookingData?.price || 0;
  const initialUserId = bookingData?.user_id || null;

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(initialPrice);
  const [showCouponError, setShowCouponError] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [finalAmount, setFinalAmount] = useState(discountedTotal);

  // Fetch wallet balance when bookingData is available
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userwallet/getUserWallet/${initialUserId}`);
        setWalletBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    if (initialUserId) {
      fetchWalletBalance();
    }
  }, [initialUserId]);

  // Recalculate the final amount whenever the wallet usage or discount changes
  useEffect(() => {
    let amountAfterDiscount = discountedTotal;
    if (useWallet) {
      amountAfterDiscount = Math.max(amountAfterDiscount - walletBalance, 0); // Ensure it's not negative
    }
    setFinalAmount(amountAfterDiscount);
  }, [useWallet, walletBalance, discountedTotal]);

  // Apply coupon logic
  const applyCoupon = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/coupan/search/${couponCode}`);
      
      debugger;
      if (response.data.message == 'Coupon not found.'){
        alert('Coupon expired or not found!!!')
      }
      
      else {
        const newDiscount = initialPrice * (response.data.discount / 100);
        const newDiscountedTotal = initialPrice - newDiscount;
        setDiscount(newDiscount);
        setDiscountedTotal(newDiscountedTotal);
      } 
      }
     catch (error) {
      console.error('Error applying coupon:', error);
    }
  };

  // Handle payment logic
  const handlePayment = () => {
    let amountToPay = discountedTotal;
    let usedWalletAmount = 0;
  
    if (useWallet) {
      usedWalletAmount = Math.min(walletBalance, discountedTotal); // Wallet deduction can't exceed discountedTotal
      amountToPay = Math.max(discountedTotal - walletBalance, 0); // Final amount can't be negative
    }
  
    console.log('Used Wallet Balance:', usedWalletAmount); // Log the wallet usage
    console.log('Final Amount to Pay:', amountToPay); // Log the final amount to be paid
  
    alert(`Proceeding to payment of ₹${amountToPay}`);
  };

  return (
    <div className="container my-5">
      {!bookingData ? (
        <Alert variant="danger">No booking data available. Please try again.</Alert>
      ) : (
        <>
          <h2>Payment Details</h2>
          <p><strong>Name:</strong> {bookingData.displayName}</p>
          <p><strong>Email:</strong> {bookingData.email}</p>
          <p><strong>price per Ticket:</strong> {bookingData.price/bookingData.number_of_members}</p>
          <p><strong>Number of tickets:</strong> {bookingData.number_of_members}</p>
          <p><strong>Total Price:</strong> ₹{bookingData.price}</p>

          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={applyCoupon}>Apply</Button>
          </InputGroup>

          {showCouponError && (
            <Alert variant="danger">Invalid coupon code.</Alert>
          )}

          {/* <p><strong>Discount Applied:</strong> ₹{discount}</p> */}
          <p><strong>Discounted Total:</strong> ₹{discount}</p>

          <Form.Check 
            type="checkbox"
            label={`Use Wallet Balance: ₹${walletBalance}`}
            checked={useWallet}
            onChange={(e) => setUseWallet(e.target.checked)}
          />

          <p><strong>Final Amount:</strong> ₹{finalAmount}</p>

          <Button variant="success" onClick={handlePayment}>Proceed to Payment</Button>
        </>
      )}
    </div>
  );
};

export default withRouter(PaymentPage);
