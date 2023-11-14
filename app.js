// Import of npm packages
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Paths of folders and files
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const superAdmin = require('./seeders/admin');
const membershipRoutes = require('./routes/membershipRoutes');
const gymstoreRoutes = require('./routes/gymstoreRoutes');



// To use files
dotenv.config();
db();
const app = express();
superAdmin();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//Routes 
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/member', membershipRoutes);
app.use('/api/store', gymstoreRoutes);


const port = process.env.PORT || 1111; // port will run only 1111

// To start the file 
app.listen(port, () => console.log(`Server is running at ${port}`));