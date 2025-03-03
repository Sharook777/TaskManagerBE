import Tasks from "./model.js";

export default async function getList(req, res) {
  try {
    const response = await Tasks.find({ createdBy: req.userId })
      .sort("-createdAt")
      .populate("createdBy", "name email")
      .select("title createdAt description");
    return res.json({ success: true, data: response });
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
}
