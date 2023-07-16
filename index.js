// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

mongoose.connect('mongodb+srv://admin:admin123@sandbox.yik8rjs.mongodb.net/120716?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas - 120716'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`API is now online on port ${process.env.PORT || 4000}`)
})