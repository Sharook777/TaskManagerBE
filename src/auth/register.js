import mongoose from "mongoose";
import { validationResult } from "express-validator";

import User from "../app/user/model.js";

export const registerController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      errors,
    });
  }

  const { email, password, name } = req.body;
  try {
    await User.create({ email, password, name });

    res.status(200).json({ success: true, message: "Registration successful" });
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
};
