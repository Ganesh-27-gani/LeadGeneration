const http = require("http")
const express = require("express")
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.json());

const N8N_WEBHOOK_URL = 'https://your-n8n-domain.com/webhook/test-lead';

app.post("/api/leads", async(req, res)=>{
    const {name, email, company, message} = req.body

    if(!name || !email){
        return res.status(400).json({success: false, message:"Name and Email are required."})
    }

    try{
         const result = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message })
    });

    const data = await result.json();
    res.status(200).json({success:true, message: 'Lead submitted successfully.', n8n: data });
      
    }catch(err){
        return res.status(500).json({success:false, message:"Lead process is failed"})
    }
})

 app.listen(3000, ()=>{
 console.log("hlo server")
})