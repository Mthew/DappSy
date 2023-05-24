import { UserModel } from "../../../database";

export default function (req, res) {
  switch (req.method) {
    case "GET":
      return getProfileInfoByName(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function getProfileInfoByName(req, res) {
  const { name } = req.query;
  const user = await UserModel.findOne({ name });

  if (!user) {
    return res.status(404).json({
      message: `El usuario ${name} no existe`,
    });
  }

  return res.json(user);
}
