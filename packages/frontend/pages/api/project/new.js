import { ProjectRepository } from "../../../database";

const api = async (req, res) => {
  try {
    const repo = new ProjectRepository();
    const itemToSave = {
      ...req.body,
      created: new Date().toISOString(),
    };
    const { id } = await repo.create(itemToSave);

    res.status(200).json({ id });
  } catch (e) {
    res.status(400).end();
  }
};

export default api;
