// create-checkout-session.ts (Express ou similar)
import { db } from './lib/db'; // conexão com MySQL
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Função para extrair usuário do token JWT
function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: number, email: string };
  } catch (err) {
    return null;
  }
}

export const createCheckoutSession = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, content-type',
    }).status(200).end();
    return;
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    const user = getUserFromToken(token);
    if (!user?.email) return res.status(401).json({ error: 'Usuário não autenticado' });

    const { priceId, successPath } = req.body;
    if (!priceId) return res.status(400).json({ error: 'priceId é obrigatório' });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined = undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const origin = req.headers.origin || 'http://localhost:3000';
    const successUrl = `${origin}${successPath ?? '/cursos'}?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/corporativo`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { user_id: String(user.id) },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Erro na sessão de checkout:', error);
    return res.status(500).json({ error: 'Erro ao criar sessão de pagamento' });
  }
};
