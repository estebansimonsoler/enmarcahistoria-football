import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Cuadro EnMarcaHistoria"
            },
            unit_amount: 2990
          },
          quantity: 1
        }
      ],
      success_url: "https://enmarcahistoria.com",
      cancel_url: "https://enmarcahistoria.com/checkout.html"
    });

    res.status(200).json({ id: session.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}