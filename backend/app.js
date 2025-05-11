const express = require ('express');
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books= require("./routes/book");
const Favourite=require("./routes/favourite");
const Cart =require("./routes/cart")
const Order =require("./routes/order")
app.use(cors());
//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//creating port
// app.listen(process.env.PORT, () => {
//     console.log(`Server Started at PORT ${process.env.PORT}`);
// });
const PORT = process.env.PORT || 3000;  // Use 3000 or any other port for local development
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
