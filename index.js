const express = require('express');
const app = express();
require('dotenv').config();
const twilio = require('twilio');
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);
const addNotionEntry = require('./addNotionEntry.js');
const {Client} = require('@notionhq/client');
const notion = new Client({ auth: process.env.AUTH });

            
app.get('/', (req, res) => {
    addNotionEntry(notion,"test")
    res.send('Hello World!');
});

app.get('/sendSMS', (req, res) => {
    client.messages.create({
        body: 'Wow you stink!',
        to: process.env.USERNUMBER, // Replace with the recipient's phone number
        from: process.env.TWILIONUMBER // Replace with your Twilio phone number
    })
        .then(message => {
            console.log(message.sid);
            res.send('SMS sent!');
        })
        .catch(error => {
            console.log(error);
            res.send('Error sending SMS');
        });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
