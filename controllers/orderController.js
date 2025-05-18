const Stripe = require('stripe');
const Order = require('./models/Order');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  const { clientId, product, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // en centavos
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const order = new Order({
      clientId,
      product,
      amount,
      paymentIntentId: paymentIntent.id,
      status: 'pending',
    });

    await order.save();
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
