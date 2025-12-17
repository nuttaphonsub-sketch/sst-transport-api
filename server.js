const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// test หน้าเว็บ
app.get('/', (req, res) => {
  res.send('🚚 SST Transport Server is running');
});

// รับข้อมูลจากเว็บ + ส่ง Telegram
app.post('/api/price', async (req, res) => {
  try {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const text = `
🚚 งานใหม่จากเว็บ SST
ชื่อ: ${req.body.name || '-'}
เบอร์: ${req.body.phone || '-'}
ต้นทาง: ${req.body.from || '-'}
ปลายทาง: ${req.body.to || '-'}
ราคา: ${req.body.price || '-'}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text
      })
    });

    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'send telegram failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
