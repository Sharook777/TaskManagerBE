import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "./model.js";

export default async function resetPassword(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  const { newPassword, currentPasword } = req.body;

  try {
    const user = await User.findOne({ _id: req.userId }).select(
      "password name"
    );
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Match Not Found",
      });
    }

    const isMatch = await bcrypt.compareSync(
      currentPasword.toString(),
      user.password
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect old password" });
    }

    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfull" });
  } catch (err) {
    let message = err.message;

    if (err instanceof mongoose.Error.ValidationError) {
      message = "Invalid data";
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }
}
