import db from "../../../utils/db/server";

const api = async (req, res) => {
  try {
    const { id } = await db.collection("project").add({
      ...req.body,
      created: new Date().toISOString(),
    });
    res.status(200).json({ id });
  } catch (e) {
    res.status(400).end();
  }
};

export default api;
