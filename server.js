const express = require("express");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorhandler");
const studentRouter = require("./routes/studentRoute");
const staffRouter = require("./routes/staffRoute");
const userRouter = require('./routes/userRoutes')
const attendanceRouter = require('./routes/attendanceRoute')
const dateRouter = require('./routes/dateRoutes');
const { AuthVerify } = require("./middlewares/authVerify");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/staffs", AuthVerify, staffRouter);
app.use("/api/students", AuthVerify, studentRouter);
app.use('/api/users', userRouter);
app.use('/api/attendance', AuthVerify, attendanceRouter)
app.use('/api/dates', AuthVerify, dateRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server Started at", PORT);
});
