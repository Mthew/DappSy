import db from "../../../utils/db/server";

export default async (req, res) => {
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
