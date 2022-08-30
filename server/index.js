require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send({ "Welome to": "Expo's Stripe example server!" });
});

app.get("/stripe-key", (req, res) => {
  res.send({ publishableKey: stripePublishableKey });
});

app.use("/stripe", express.raw({ type: "*/*" }));

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
    res.send(req.body);
});

app.post("/buy", async (req, res) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  try {
    // Getting data from client
    let { amount, email } = req.body;
    // Simple validation
    if (!amount || !email)
      return res.status(400).json({ message: "All fields are required" });
    amount = parseInt(amount);
    // Initiate payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { email },
    });
    // Extracting the client secret
    const clientSecret = paymentIntent.client_secret;
    // Sending the client secret as response
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    // Catch any error and send error 500 to client
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/stripe", async (req, res) => {
  // Get the signature from the headers
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    // Check if the event is sent from Stripe or a third party
    // And parse the event
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // Handle what happens if the event is not from Stripe
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




