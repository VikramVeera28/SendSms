// server.js
require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // To allow requests from your frontend
app.use(express.json()); // To parse JSON request bodies

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/api/send-sms', async (req, res) => {
  const { mobile, body } = req.body;

  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_FROM_NUMBER,
      to: `+91${mobile}`,
      body,
    });
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
