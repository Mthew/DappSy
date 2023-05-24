import { ProjectModel } from "../../../database";

export default function (req, res) {
  switch (req.method) {
    case "GET":
      return getData(req, res);
    case "POST":
      return createData(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function createData(req, res) {
  try {
    const { body } = req;
    const entry = await ProjectModel.create(body);
    res.status(201).json(entry);
  } catch (e) {
    res.status(400).end();
  }
}

async function getData(req, res) {
  try {
    const entriesData = await ProjectModel.get();
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
}
