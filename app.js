const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const db = require('./db');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
db();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 1111;

app.listen(port, () => console.log(`Server is running at ${port}`));