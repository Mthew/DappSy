import { UserModel } from "../../../database";

export default function (req, res) {
  switch (req.method) {
    case "PUT":
      return modifyProfileData(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function modifyProfileData(req, res) {
  const { id } = req.body;
  const user = await UserModel.update(id, req.body);

  if (!user) {
    return res.status(404).json({
      message: `El usuario ${name} no existe`,
    });
  }

  return res.json(user);
}
