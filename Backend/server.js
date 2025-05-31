const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");  

const app = express();

 
app.use(cors());
app.use(bodyParser.json());

const N8N_WEBHOOK_URL = 'https://sirasaniganesh.app.n8n.cloud/webhook/test-leads';

app.post("/", async (req, res) => {
    const { name, email, company, message } = req.body;

    
    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and Email are required." });
    }

    console.log('Lead received from frontend:', { name, email, company, message });

    try {
        const result = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, message })
        });

        const text = await result.text();
        console.log("Response from n8n:", text);

        res.status(200).json({ success: true, message: 'Lead submitted and sent to n8n successfully.' });

    } catch (err) {
        console.error("Error forwarding to n8n:", err.message);
        res.status(500).json({ success: false, message: "Failed to send lead to n8n." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
