require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const sendMail = require('./email');

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/email', (req, res) => {
    const {subject, email, text} = req.body;
    console.log('Data:', req.body);

sendMail(email, subject, text, function(err, data) {
    if (err) {
        console.log('ERROR: ', err);
        return res.status(500).json({ message: err.message || 'Internal Error' });
    }
    console.log('Email sent!!!');
    return res.json({ message: 'Email sent!!!!!' });
});
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/error', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.get('/email/sent', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
});

app.listen(PORT, () => {
    console.log('Server is starting on PORT,', 8000);
});