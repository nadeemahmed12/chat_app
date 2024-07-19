const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const router = express.Router();
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, username: user.username }, "secret");
  } else {
    res.status(401).json({ error: "Invalid Creds" });
  }
});
module.exportss=router;