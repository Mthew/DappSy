import db from "../../../utils/db/server";

export default async (req, res) => {
  try {
    const entries = await db.collection('project').get();
    const entriesData = entries.docs.map(entry => entry.data());
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
};
