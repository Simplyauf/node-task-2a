const rateLimit = require("express-rate-limit");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const analyticLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  handler: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Analytics Service Upgrade",
              },
              unit_amount: 500, // $5.00
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.BASE_URL}/analytics-upgrade-success`,
        cancel_url: `${process.env.BASE_URL}/analytics-upgrade-cancel`,
      });

      res.redirect(303, session.url);
    } catch (error) {
      console.error("Stripe session creation failed:", error);
      res.status(500).json({ error: "Failed to create payment session" });
    }
  },
});

module.exports = analyticLimiter;
