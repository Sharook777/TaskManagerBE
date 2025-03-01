import { validationResult } from "express-validator";

import Tasks from "./model.js";

export default async function updateItem(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ success: false, message: "Id required" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid data",
        errors,
      });
    }

    const response = await Tasks.findByIdAndUpdate(id, req.body, { new: true });
    if (!response) {
      return res.status(401).json({
        success: false,
        message: `No item found with id ${id}`,
      });
    }
    return res.json({ success: true, data: response });
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
}
