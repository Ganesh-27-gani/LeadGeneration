
const express = require("express")
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.json());

const N8N_WEBHOOK_URL = 'https://sirasaniganesh.app.n8n.cloud/webhook/test-leads';

app.post("/api/leads", async (req, res) => {
    const { name, email, company, message } = req.body

    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and Email are required." })
    }
    
    console.log('Lead received:', { name, email, company, message });

    try {
        const result = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, message })
        });

        const data = await result.json();
        res.status(200).json({ success: true, message: 'Lead submitted successfully.', n8n: data });

    } catch (err) {
         console.log(err)
    }
})

app.listen(3000, () => {
    console.log("running on port 3000")
})
 