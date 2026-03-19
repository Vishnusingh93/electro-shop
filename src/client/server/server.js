// server.js
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

const myWhatsApp = "whatsapp:+6367599137"; // aapka number
const twilioWhatsApp = "whatsapp:6367599137"; // Twilio sandbox number

app.post("/send-order", async (req, res) => {
  const { name, cart, address, contact } = req.body;

  let message = `New Order from ${name}\nContact: ${contact}\nAddress: ${address}\n\nItems:\n`;
  cart.forEach(c => {
    message += `${c.name} x ${c.qty} = ₹${c.price*c.qty}\n`;
  });

  const total = cart.reduce((sum, c) => sum + c.price*c.qty, 0);
  message += `\nTotal: ₹${total}`;

  try {
    await client.messages.create({
      from: twilioWhatsApp,
      to: myWhatsApp,
      body: message
    });
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));