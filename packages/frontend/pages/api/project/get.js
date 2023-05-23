import { ProjectModel } from "../../../database";

const api = async (req, res) => {
  try {
    const entriesData = await ProjectModel.get();
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
};
export default api;
