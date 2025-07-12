import { db } from 'src/lib/db.ts';
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IncomingMessage, ServerResponse } from 'http';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Função para extrair usuário do JWT manualmente
const getUserFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: string, email: string };
  } catch {
    return null;
  }
};

export const checkSubscription = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, content-type',
    }).end();
    return;
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.writeHead(401).end(JSON.stringify({ error: 'No token provided' }));
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  const user = getUserFromToken(token);

  if (!user || !user.email) {
    res.writeHead(401).end(JSON.stringify({ error: 'Invalid token or user' }));
    return;
  }

  const customers = await stripe.customers.list({ email: user.email, limit: 1 });

  let subscribed = false;
  let subscriptionTier = null;
  let subscriptionEnd = null;
  let stripeCustomerId = null;

  if (customers.data.length > 0) {
    const customer = customers.data[0];
    stripeCustomerId = customer.id;

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      subscribed = true;
      const subscription = subscriptions.data[0];
      const priceId = subscription.items.data[0].price.id;

      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      subscriptionTier = priceId === 'price_1RWfhmRvHw6hJ7Pc5SKfc6Oo'
        ? 'Escola Básica'
        : priceId === 'price_1RWfjgRvHw6hJ7PcLaTee9gT'
        ? 'Escola Premium'
        : 'Desconhecido';
    }
  }

  // Atualizar/inserir no MySQL
  await db.execute(`
    INSERT INTO subscribers (email, user_id, stripe_customer_id, subscribed, subscription_tier, subscription_end, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE 
      stripe_customer_id = VALUES(stripe_customer_id),
      subscribed = VALUES(subscribed),
      subscription_tier = VALUES(subscription_tier),
      subscription_end = VALUES(subscription_end),
      updated_at = NOW()
  `, [user.email, user.id, stripeCustomerId, subscribed, subscriptionTier, subscriptionEnd]);

  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify({ subscribed, subscriptionTier, subscriptionEnd }));
};
