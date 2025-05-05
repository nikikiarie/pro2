const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const crypto = require("crypto");
// const sendMail = require("../utils/sendMail");
const { generateToken } = require("../utils/token");
const { sendVerificationEmail } = require("../utils/sendMail");
const { verifyToken } = require("../utils/token");

router.post("/register", async (req, res) => {
  try {
    // Destructure all required fields from request body
    const { firstname, lastname, username, email, password } = req.body;

    // Validate all required fields
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ 
        message: "All fields (firstname, lastname, username, email, password) are required" 
      });
    }

    // Check for existing users
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ 
        message: existingUser.username === username 
          ? "Username already exists" 
          : "Email already exists"
      });
    }

    // Create new user with all required fields
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      isVerified: false
    });

    const savedUser = await newUser.save();

    // Generate and send verification email
    const verificationToken = await generateToken(savedUser._id, 'email-verification');
    const verificationLink = `${process.env.BACKEND_URL}/verify-email?token=${verificationToken}&userId=${savedUser._id}`;
    
    const emailSent = await sendVerificationEmail(savedUser.email, verificationLink);
    
    if (!emailSent) {
      return res.status(500).json({ 
        message: "User created but failed to send verification email" 
      });
    }

    res.status(201).json({
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      userId: savedUser._id
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!user.verified) {
      // Check if an active verification token already exists
      const existingToken = await Token.findOne({ 
        userId: user._id, 
        type: 'email-verification',
        usedAt: null,
        createdAt: { $gt: new Date(Date.now() - 3600 * 1000) } // Not expired
      });

      if (existingToken) {
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${existingToken.token}&userId=${user._id}`;
        await sendVerificationEmail(user.email, verificationLink);
        
        return res.status(403).json({ 
          message: "Account not verified. A verification link has been re-sent to your email.",
          canResend: false,
          userId: user._id
        });
      }

      // Create new verification token
      const verificationToken = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
        type: 'email-verification'
      });
      
      await verificationToken.save();
      const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken.token}&userId=${user._id}`;
      await sendVerificationEmail(user.email, verificationLink);

      return res.status(403).json({ 
        message: "Account not verified. A new verification link has been sent to your email.",
        canResend: true,
        userId: user._id
      });
    }

    // Verify password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    const { password, ...userData } = user._doc;

    res.status(200).json({ 
      accessToken, 
      ...userData 
    });

  } catch (err) {
    console.error("Login error:", err);
    
    if (err.code === 11000) {
      // Handle duplicate token error by resending existing token
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const existingToken = await Token.findOne({ 
          userId: user._id, 
          type: 'email-verification',
          usedAt: null
        });
        
        if (existingToken) {
          const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${existingToken.token}&userId=${user._id}`;
          await sendVerificationEmail(user.email, verificationLink);
          
          return res.status(403).json({ 
            message: "Account not verified. A verification link has been re-sent to your email.",
            canResend: false,
            userId: user._id
          });
        }
      }
    }
    
    res.status(500).json({ message: "Login failed" });
  }
});
// router.post("/login", async (req, res) => {
//   console.log(req.body);
//   try {
//     const user = await User.findOne({ username: req.body.username });

//     if (!user) return res.status(403).json({message:"Wrong Credentials"});

//     const isCorrect = bcrypt.compareSync(req.body.password, user.password);

//     if (!isCorrect) return res.status(403).json({message:"Wrong Username or Password"});

//     const accessToken = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_SECRET_KEY
//     );

//     const { password, ...others } = user._doc;

//     res.status(200).json({ accessToken, ...others });
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err)
//   }
// });

router.post("/verify-email", async (req, res) => {
  console.log("Verification request received:", req.body);
  try {
    const { token, userId } = req.body;

    // Verify token
    const { valid, message } = await verifyToken(userId, token, 'email-verification');
    if (!valid) {
      return res.status(400).json({ success: false, message });
    }

    // Update user
    await User.findByIdAndUpdate(userId, { 
      verified: true,
      verifiedAt: new Date() 
    });

    res.json({ 
      success: true,
      message: "Email verified successfully! You can now login."
    });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Email verification failed. Please try again."
    });
  }
});

module.exports = router;
