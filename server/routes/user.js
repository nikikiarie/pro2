const { verifyTokenAndUser, verifyTokenAndAdmin } = require("../verifyToken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");

const router = require("express").Router();




router.put("/:id", verifyTokenAndUser, async (req, res, next) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.delete("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User delelted");
  } catch (err) {
    res.status(200).json(err);
  }
});



router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json("invalid link");

    const token = await Token.findOne({
      userId: req.params.id,
      token: req.params.token,
    });

    if (!token) return res.status(400).json("invalid link");
    const newUser = await User.findByIdAndUpdate(req.params.id, { verified: true },{new:true});
    await token.remove();
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (error) {}
});




module.exports = router;
