const express = require('express');
const ProductRoute = require('./routes/ProductRoute');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
app.use(cors());
dotenv.config();
connectDB();    //connect to mongodb



app.use(express.json());
app.use("/api",ProductRoute)
const PORT=process.env.PORT  || 5000;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
}); 