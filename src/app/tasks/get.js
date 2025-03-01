import Tasks from "./model.js";

export default async function getItem(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({ success: false, message: "Id required" });
    }
    const response = await Tasks.findById(id)
      .populate("createdBy", "name email")
      .select("name title createdAt createdBy");

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
