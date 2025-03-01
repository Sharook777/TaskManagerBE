import { validationResult } from "express-validator";

import Tasks from "./model.js";

export default async function createItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      sucess: false,
      message: "Invalid data",
      errors,
    });
  }
  try {
    const data = {
      ...req.body,
      createdBy: req.userId,
    };
    const response = await Tasks.create(data);
    return res.json({ success: true, data: response });
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
}
