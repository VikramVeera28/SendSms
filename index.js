// server.js
require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // To allow requests from your frontend
app.use(express.json()); // To parse JSON request bodies

const accountSid = 'AC5ead0b603f108b6ba4139e3fb00c4d47';
const authToken = '34c2bb1c868afb7ed5f53eb8027c23b6';
const client = twilio(accountSid, authToken);

app.post('/api/send-sms', async (req, res) => {
  const { mobile, body } = req.body;

  if (!mobile || !body) {
    return res.status(400).json({ success: false, error: 'Missing mobile or body' });
  }

  try {
    const message = await client.messages.create({
      from: '+15076205292',
      to: `+91${mobile}`,
      body,
    });
    console.log('Message sent:', message);
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('Twilio Error:', err); // Log the detailed Twilio error
    res.status(500).json({ success: false, error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
