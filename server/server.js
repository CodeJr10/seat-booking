require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY); // Access the Stripe private key

app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ origin: "http://localhost:5174" })); // Allow requests from your front-end

// Create checkout session endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body; // Extract the amount from the request body

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Table Booking",
            },
            unit_amount: amount, // Amount should be in the smallest currency unit (e.g., paise for INR)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success`, // Access the SERVER_URL from .env
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });

    // Respond with the session ID
    res.json({ id: session.id });
  } catch (error) {
    // Handle any errors and respond with status 500
    res.status(500).json({ error: error.message });
  }
});

// Start the server on port 3000
const PORT = 3000; // Ensure you're using the correct port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Output the URL to access the server
});
