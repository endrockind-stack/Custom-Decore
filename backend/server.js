const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_replace');
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'endrockind@gmail.com';

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname,'uploads') });

app.get('/suggestions', async (req,res)=>{
  try{
    const ml = process.env.ML_URL || 'http://localhost:8000';
    const r = await axios.get(ml + '/generate');
    return res.json(r.data);
  }catch(e){
    return res.json({ suggestions: [] });
  }
});

app.post('/upload', upload.single('file'), async (req,res)=>{
  try{
    const ml = process.env.ML_URL || 'http://localhost:8000';
    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));
    const r = await axios.post(ml + '/generate', form, { headers: form.getHeaders() });
    return res.json(r.data);
  }catch(e){
    console.error(e);
    return res.status(500).json({ error: 'ml error' });
  }
});

app.post('/create-checkout-session', async (req,res)=>{
  try{
    const { items, name, email } = req.body;
    const line_items = (items||[]).map(i=>({ price_data: { currency: 'inr', product_data: { name: i.name}, unit_amount: Math.round((i.price||0)*100) }, quantity: 1 }));
    const session = await stripe.checkout.sessions.create({ payment_method_types: ['card'], mode:'payment', line_items, success_url: process.env.SUCCESS_URL || 'https://example.com/success', cancel_url: process.env.CANCEL_URL || 'https://example.com/cancel', metadata: { owner_email: OWNER_EMAIL, customer_name: name, customer_email: email } });
    res.json({ url: session.url });
  }catch(e){ console.error(e); res.status(500).json({error:'stripe error'}) }
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req,res)=>{
  res.json({ received: true });
});

async function sendOrderEmail(order){
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT||465),
    secure: true,
    auth: { user: process.env.SMTP_USER || 'endrockind@gmail.com', pass: process.env.SMTP_PASS || 'your_app_password' }
  });
  const html = `<h2>New Order</h2><pre>${JSON.stringify(order,null,2)}</pre>`;
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER || 'endrockind@gmail.com', to: process.env.OWNER_EMAIL || 'endrockind@gmail.com', subject: 'New order', html });
}

app.listen(process.env.PORT || 5000, ()=> console.log('Backend running'));