
// paymentIntent.js
const stripe = require('stripe')('sk_test_51QI7KACIEPPiVuoMgriLucF39IZxZ7fQ4NZfmybPnyEkMABEOz4ORgUUX8yZcWRtUhTSQ6jwXoQtMhWXS7N1Xr6R00QgErIdVS');

const createPaymentIntent = async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Example amount in cents
            currency: 'usd',
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { createPaymentIntent };
