const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});


mongoose.connect('mongodb://localhost:27017/ethere', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model for user data
const userSchema = new mongoose.Schema({
  name: String,
  emailOrPhone: String,
  dob: Date,
  gender: String
});
const User = mongoose.model('Users', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to serve signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'signUp.html'));
});

// Route to handle signup form submission
app.post('/signup', async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    // res.send('User signed up successfully!');
    res.redirect('/')
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(2000 , () => {
  console.log('Server is running on port 2000');
});