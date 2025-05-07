// const express = require("express");
// const dotenv = require("dotenv");
// const path = require("path")
// const http = require('http');
// const socketIo = require('socket.io');
// const mongoose = require("mongoose");
// const cors = require("cors");


// dotenv.config()


// const userRoutes = require("./routes/user");
// const cartRoutes = require("./routes/cart");
// const productRoutes = require("./routes/product");
// const authRoutes = require("./routes/auth");
// const orderRoutes = require("./routes/order");
// const stripeRoutes = require("./routes/stripe");
// const uploadRoutes = require("./routes/upload");
// const mpesaRoutes = require("./routes/mpesa");



// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.set('socketio', io);

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'templates'));



// app.use(cors({
//   origin: 'https://pro2-frontend.onrender.com',
//   methods: ['GET', 'POST']
// }));


// // app.use(cors({
// //   origin: '*', // Temporary for debugging
// //   methods: ['POST', 'OPTIONS'] // MPesa uses POST
// // }));


// // app.use("/api/checkout/webhook",express.raw({type:"*/*"}))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.path}`);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   next();
// });

// app.use("/api/upload", uploadRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/checkout", stripeRoutes);
// app.use("/api", mpesaRoutes);


// io.on('connection', (socket) => {
//   console.log('New client connected:', socket.id);

//   // Join a user-specific room
//   socket.on('join_room', (userId) => {
//     socket.join(`user_${userId}`);
//     console.log(`User ${userId} joined room`);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // app.use(express.static(path.join(__dirname, "./client/build")));
// // app.get("*", function (_, res) {
// //   res.sendFile(
// //     path.join(__dirname, "./client/build/index.html"),
// //     function (err) {
// //       res.status(500).send(err);
// //     }
// //   );
// // });

// app.get("/", (req, res) => {
//   res.send("working");
// });


// const PORT = process.env.PORT || 4000
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL).then(() => {
//   app.listen(PORT, () => console.log("connected"));
//   console.log(` db connected `);
// });



const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// Import routes
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");
const uploadRoutes = require("./routes/upload");
const mpesaRoutes = require("./routes/mpesa");

const app = express();
const server = http.createServer(app);

// Enhanced Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: ["https://pro2-frontend.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST"]
  },
  transports: ['websocket'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

app.set('socketio', io);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Middleware
app.use(cors({
  origin: 'https://pro2-frontend.onrender.com',
  methods: ['GET', 'POST'],
  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api", mpesaRoutes);

// Socket.io Events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  

  socket.on('join_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/test-payment-success", async (req, res) => {
  const { userId, orderId } = req.body;
  const io = req.app.get("socketio");
  console.log("Test emitting to:", `user_${userId}`);
  io.to(`user_${userId}`).emit("payment_success", {
    orderId,
    status: "paid",
    mpesaReceipt: "TEST123",
  });
  res.json({ status: "success", message: "Test event emitted" });
});

// Database connection and server start
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Database connected");
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });