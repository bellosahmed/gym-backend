const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const superAdmin = require('./seeders/admin');
const membershipRoutes = require('./routes/membershipRoutes');
const gymstoreRoutes = require('./routes/gymstoreRoutes');

dotenv.config();
db();
const app = express();
superAdmin();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/member', membershipRoutes);
app.use('/api/store', gymstoreRoutes);

const port = process.env.PORT || 1111;

app.listen(port, () => console.log(`Server is running at ${port}`));