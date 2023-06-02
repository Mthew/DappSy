import { UserModel } from "../../../database";

export default function (req, res) {
  switch (req.method) {
    case "GET":
      return getProfileInfoById(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function getProfileInfoById(req, res) {
  const { id } = req.query;
  const user = await UserModel.getById(id);

  if (!user) {
    return res.status(404).json({
      message: `El usuario no existe`,
    });
  }

  return res.json(user);
}
