import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../app/user/model.js";

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid data", errors });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("password name email");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const accessToken = jwt.sign(
      {
        email,
        id: user._id,
        name: user.name,
      },
      TOKEN_SECRET
    );
    const refreshToken = jwt.sign({ email, id: user._id }, TOKEN_SECRET);

    return res.status(200).json({
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (er) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
