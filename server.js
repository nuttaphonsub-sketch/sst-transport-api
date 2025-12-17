const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;8582917338:AAEg8VuXivyUII6AGunVZ-yC0Iut4ZuLezg
const CHAT_ID = process.env.CHAT_ID;8522730284

// test หน้าเว็บ
app.get('/', (req, res) => {
  res.send('🚚 SST Transport Server is running');
});

// รับข้อมูลจากเว็บ
app.post('/api/price', async (req, res) => {
  console.log('📦 DATA FROM WEB =====>');
  console.log(req.body);

  const { name, phone, from, to, price } = req.body;

  const message = `
🚚 *มีคนขอคำนวณราคา*
👤 ชื่อ: ${name}
📞 เบอร์: ${phone}
📍 จาก: ${from}
🎯 ไป: ${to}
💰 ราคา: ${price}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    res.json({ status: 'ok', message: 'ส่ง Telegram แล้ว' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
