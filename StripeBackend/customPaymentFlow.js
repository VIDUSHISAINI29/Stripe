const stripe = require('stripe')('sk_test_51QI7KACIEPPiVuoMgriLucF39IZxZ7fQ4NZfmybPnyEkMABEOz4ORgUUX8yZcWRtUhTSQ6jwXoQtMhWXS7N1Xr6R00QgErIdVS'); // Add your secret key here

// Custom payment flow function
const handleCustomPaymentFlow = async (req, res) => {
    try {
        // Get payment amount from request body (ensure this is securely set in production)
        const { amount, currency = 'usd' } = req.body;

        // Create a Payment Intent with the desired amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // amount should be passed in cents, e.g., $10.00 = 1000
            currency: currency,
            payment_method_types: ['card'], // specify payment method type
        });

        // Send clientSecret to client to complete payment on frontend
        res.send({
            clientSecret: paymentIntent.client_secret,
            message: 'Custom payment flow initiated successfully',
        });
    } catch (error) {
        // Handle errors and send response
        res.status(500).send({ error: error.message });
    }
};

module.exports = { handleCustomPaymentFlow };
