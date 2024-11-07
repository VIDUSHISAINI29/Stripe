const express = require('express');
const { createPaymentIntent } = require('./paymentIntent');
const { handleCheckOut } = require('./checkOut');
const { handleCustomPaymentFlow } = require('./customPaymentFlow');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Route for creating a payment intent
app.post('/create-payment-intent', createPaymentIntent);

// Route for handling checkout
app.post('/create-checkout-session', handleCheckOut);

// Route for custom payment flow
app.post('/custom-payment', handleCustomPaymentFlow);

app.listen(3000, () => console.log('Server running on port 3000'));
