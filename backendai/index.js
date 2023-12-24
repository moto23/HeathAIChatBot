const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthcareaiModel = require('./modals/healthcareai');
const app = express();
const path = require("path");



app.use(express.json());
app.use(cors());

//static files
app.use(express.static(path.join(__dirname, "./heathcareui/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./heathcareui/build/index.html"));
});

mongoose
  .connect('mongodb+srv://prasad38:mongo1234@ecommerce.aldbrxj.mongodb.net/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error: ', err));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  healthcareaiModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json('Success');
        } else {
          res.json('The password is incorrect');
        }
      } else {
        res.json('No record existed');
      }
    })
    .catch((err) => res.status(500).json('Internal server error'));
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  healthcareaiModel.create({ name, email, password })
    .then(healthcare => res.json(healthcare))
    .catch(err => res.status(500).json("Internal server error"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
