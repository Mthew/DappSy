import ProjectRepository from "../../../database/projectRepository";

const api = async (req, res) => {
  try {
    const entriesData = await new ProjectRepository().getAllDocuments();
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
};
export default api;