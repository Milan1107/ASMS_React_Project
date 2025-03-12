const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const app = express();

const environment = new paypal.core.SandboxEnvironment(
  'AY48GvE-KpIwdl1MRHd_jgL-tJOjTwyYfUSYYU3jFfqQcP4tCGzqUxe3ZFXqr2ooIXiYey88DGVgey4E',
  'EEFXfQdhDQldS51CGSjirHgeZMl9rZD_maFJPu6chmMeRZh4NdS6rjhHjQPn9rPNQnQ-yE4rynn_Y531'
);
const client = new paypal.core.PayPalHttpClient(environment);

app.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '10.00', // Payment amount
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/capture-order', async (req, res) => {
  const orderId = req.body.orderId;
  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  try {
    const capture = await client.execute(request);
    res.json({ capture });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
