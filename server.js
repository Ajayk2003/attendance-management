const express = require('express');
const dotenv = require('dotenv');

const errorHandler = require('./middlewares/errorhandler');
const studentRouter = require('./routes/studentRoute');
const staffRouter = require('./routes/staffRoute');
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json())


app.use('/api/staffs', staffRouter);
app.use('/api/students', studentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server Started at', PORT);
})

