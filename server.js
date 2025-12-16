const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// test หน้าเว็บ
app.get('/', (req, res) => {
  res.send('🚚 SST Transport Server is running');
});

// รับข้อมูลจากเว็บ
app.post('/api/price', (req, res) => {
  console.log('📦 DATA FROM WEB =====>');
  console.log(req.body);

  // ตรงนี้อนาคตเอาไปส่ง LINE ได้
  res.json({
    status: 'ok',
    message: 'รับข้อมูลเรียบร้อยแล้ว'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
