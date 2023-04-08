const express = require('express');
const app = express();
require('dotenv').config();
const twilio = require('twilio');
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);
const addNotionEntry = require('./addNotionEntry.js');
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.AUTH });
const bodyParser = require('body-parser');
const cron = require('node-cron');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


setInterval(() => {
    msgTime= "0 0 0"
    const currentTime = new Date();
    const time = `${currentTime.getHours()} ${currentTime.getMinutes()} ${currentTime.getSeconds()}`
    if(time===msgTime){
        client.messages.create({
            body: 'Daily Journal: What are some things you did well today? What are some things you could have done better? What are somethings you learned/can improve upon?',
            to: process.env.USERNUMBER, // Replace with the recipient's phone number
            from: process.env.TWILIONUMBER // Replace with your Twilio phone number
        })
            .then(message => {
               console.log(message)
            })
            .catch(error => {
                console.log(error);
                
            }
            )
    }
}, 1000);

app.post('/', (req, res) => {
    const { From, Body } = req.body;
    if (Body) {
        addNotionEntry(notion, Body)
        res.send('Notion entry added!');
    }
    res.send("No entry found")
});


app.listen(8080, () => {
    console.log('Server is running on port 3000');
});
