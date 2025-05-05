const express = require("express");
const dotenv = require("dotenv");
const path = require("path")
const mongoose = require("mongoose");
const cors = require("cors");


dotenv.config()


const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");
const uploadRoutes = require("./routes/upload");
const mpesaRoutes = require("./routes/mpesa");



const app = express();

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use(cors())


// app.use(cors({
//   origin: '*', // Temporary for debugging
//   methods: ['POST', 'OPTIONS'] // MPesa uses POST
// }));


// app.use("/api/checkout/webhook",express.raw({type:"*/*"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api", mpesaRoutes);



// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

app.get("/", (req, res) => {
  res.send("working");
});


const PORT = process.env.PORT || 4000
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => console.log("connected"));
  console.log(` db connected `);
});
