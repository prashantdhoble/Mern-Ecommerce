const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoute")

const categoryRoutes =require("./routes/categoryRoutes")
const productRoutes =require("./routes/productRoutes") 
const cors=require ("cors");

//configure env
require("dotenv").config({path:"backend/config/.env"});

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 3000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
  );
});
