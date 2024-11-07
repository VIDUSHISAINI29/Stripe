const express = require('express');
const stripe = require('stripe')('sk_test_51QI7KACIEPPiVuoMgriLucF39IZxZ7fQ4NZfmybPnyEkMABEOz4ORgUUX8yZcWRtUhTSQ6jwXoQtMhWXS7N1Xr6R00QgErIdVS');
const cors = require('cors');
const app = express();

// Allow Cross-Origin Requests (CORS)
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Create Checkout Session (POST request)
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1QI9VVCIEPPiVuoM2gFmHiwC', // Replace with your actual Price ID
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://your-website.com/success',
            cancel_url: 'https://your-website.com/cancel',
        });

        res.json({ url: session.url }); // Send session URL as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
    }
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
