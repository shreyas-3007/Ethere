// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { required } = require('joi');

// const app = express();




// app.use(express.static(path.join(__dirname, '')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '', 'index.html'));
// });


// mongoose.connect('mongodb://localhost:27017/ethere', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define schema and model for user data
// const userSchema = new mongoose.Schema({
//   name: String,
//   emailOrPhone: String,
//   dob: Date,
//   gender: String,
//   password:String
// });
// const User = mongoose.model('Users', userSchema);

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/login',(req,res)=>
// {
//     res.sendFile(path.join(__dirname,'pages','login.html'))
// });

// // Route to serve signup page
// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'pages', 'signUp.html'));
// });

// // Route to handle signup form submission
// app.post('/signup', async (req, res) => {
//   try {
//     const userData = req.body;
//     const user = new User(userData);
//     await user.save();
//     // res.send('User signed up successfully!');
//     res.redirect('/')
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });


// app.listen(2000 , () => {
//   console.log('Server is running on port 2000');
// });


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware for session management
app.use(session({
  secret: 'secret', // Change this to a secure random string
  resave: false,
  saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, '')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ethere', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model for user data
const userSchema = new mongoose.Schema({
  name: String,
  emailOrPhone: String,
  dob: Date,
  gender: String,
  password: String,
  role: { type: String, default: 'customer' } // Add a role field with default value 'customer'
});
const User = mongoose.model('User', userSchema);

// Middleware for authentication
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

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
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

// Route to handle login form submission
app.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await User.findOne({ emailOrPhone, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid email/phone or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to handle logout
app.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Example route for admin-only access
app.get('/admin/dashboard', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (user.role === 'admin') {
      res.send('Admin Dashboard');
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
