const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== รับข้อมูลจากฟอร์ม =====
app.post('/api/lineoa-webhook-for-price-request', (req, res) => {
  const data = req.body;

  // เพิ่มเวลาเซิร์ฟเวอร์
  data.serverTime = new Date().toISOString();

  // บันทึกเป็นไฟล์
  fs.appendFileSync(
    'requests.json',
    JSON.stringify(data, null, 2) + ',\n'
  );

  console.log('📥 มีข้อมูลใหม่เข้ามา');
  console.log(data);

  res.json({ status: 'ok' });
});

// ===== หน้าเช็กว่า server ทำงาน =====
app.get('/', (req, res) => {
  res.send('SST Transport Server is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
